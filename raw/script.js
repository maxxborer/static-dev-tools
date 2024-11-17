/* eslint-disable */
// @ts-nocheck
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const mrForm = document.getElementById('mr-form');
    const gitlabTokenInput = document.getElementById('gitlabToken');
    const mrUrlInput = document.getElementById('mrUrl');
    const configTextInput = document.getElementById('configText');
    const messageContainer = document.getElementById('message-container');
    const messagePre = document.getElementById('message');
    const copyButton = document.getElementById('copy-button');

    const LOCAL_STORAGE_KEYS = {
      mrUrl: 'mrUrl',
      configText: 'configText',
    };

    const localStorageAPI = {
      get: (key) => localStorage.getItem(key) || '',
      set: (key, value) => localStorage.setItem(key, value),
    };

    console.log(localStorageAPI.get(LOCAL_STORAGE_KEYS.mrUrl), localStorageAPI.get(LOCAL_STORAGE_KEYS.configText));
    mrUrlInput.value = localStorageAPI.get(LOCAL_STORAGE_KEYS.mrUrl);
    configTextInput.value = localStorageAPI.get(LOCAL_STORAGE_KEYS.configText);

    [mrUrlInput, configTextInput].forEach((input) => {
      input.addEventListener('input', () => {
        localStorageAPI.set(input.id, input.value);
      });
    });

    mrForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitButton = mrForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Загрузка...';

      const gitlabToken = gitlabTokenInput.value.trim();
      const mrUrl = mrUrlInput.value.trim();
      const configText = configTextInput.value.trim();

      messageContainer.style.display = 'none';
      messagePre.textContent = '';

      try {
        if (!mrUrl || !gitlabToken) {
          throw new Error('Пожалуйста, введите корректный URL MR и GitLab токен.');
        }

        let parsedMrUrl;
        try {
          parsedMrUrl = parseMrUrl(mrUrl);
          if (!parsedMrUrl) throw new Error();
        } catch {
          throw new Error('Неверный URL MR.');
        }

        const { gitlabDomain, projectPath, iid } = parsedMrUrl;

        const projectId = await getProjectId(gitlabDomain, projectPath.slice(1), gitlabToken);

        const mrData = await getMrData(gitlabDomain, projectId, iid, gitlabToken);

        const { target_branch, title, web_url } = mrData;

        let config;
        try {
          config = JSON.parse(configText);
        } catch {
          throw new Error('Конфигурация имеет неверный JSON формат.');
        }

        const hashtags = generateHashtags(config, projectId, target_branch);

        const hashtagsString = Array.from(hashtags).join(' ');

        const escapedTitle = escapeHtml(title);
        const escapedWebUrl = escapeHtml(web_url);

        const resultMessage = [`MR to ${target_branch} ${hashtagsString}`, escapedTitle, escapedWebUrl].join('\n\n');

        copyToClipboard(resultMessage);
        messagePre.textContent = resultMessage;
        messageContainer.style.display = 'block';
      } catch (error) {
        console.error(error);
        alert(error.message || 'Произошла неизвестная ошибка.');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });

    copyButton.addEventListener('click', () => {
      copyToClipboard(messagePre.textContent);
    });
  });
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      alert('Текст скопирован в буфер обмена.');
    },
    (err) => {
      console.error('Ошибка копирования в буфер обмена: ', err);
      alert('Не удалось скопировать текст в буфер обмена.');
    },
  );
}

function parseMrUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const pathnameParts = parsedUrl.pathname.split('/');
    const projectPath = '/' + pathnameParts.slice(1, -3).join('/');
    const iid = pathnameParts[pathnameParts.length - 1];
    const gitlabDomain = parsedUrl.origin;

    return { gitlabDomain, projectPath, iid };
  } catch (error) {
    console.error(error);
    alert('Неверный URL MR.', error);
    return null;
  }
}

async function getProjectId(gitlabDomain, projectPath, gitlabToken) {
  const encodedProjectPath = encodeURIComponent(projectPath);
  const response = await fetch(`${gitlabDomain}/api/v4/projects/${encodedProjectPath}`, {
    headers: { 'Private-Token': gitlabToken },
    method: 'GET',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Не удалось получить данные проекта: ${response.status} ${response.statusText}. ${errorText}`);
  }

  const data = await response.json();
  return data.id;
}

async function getMrData(gitlabDomain, projectId, iid, gitlabToken) {
  const response = await fetch(`${gitlabDomain}/api/v4/projects/${projectId}/merge_requests/${iid}`, {
    headers: { 'Private-Token': gitlabToken },
    method: 'GET',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Не удалось получить данные MR: ${response.status} ${response.statusText}. ${errorText}`);
  }

  const data = await response.json();
  return data;
}

function generateHashtags(config, projectId, targetBranch) {
  const hashtags = new Set(config.defaultHashtags || []);

  if (!Array.isArray(config.rules)) {
    throw new Error("Поле 'rules' должно быть массивом.");
  }

  config.rules.forEach((rule) => {
    if (!rule.conditions || !rule.actions) {
      throw new Error("Каждое правило должно содержать 'conditions' и 'actions'.");
    }

    const { conditions, actions } = rule;
    const { projectId: ruleProjectId, targetBranch: branchPattern } = conditions;

    let projectIdMatches = true;
    if (ruleProjectId !== undefined) {
      if (Array.isArray(ruleProjectId)) {
        projectIdMatches = ruleProjectId.includes(projectId);
      } else {
        projectIdMatches = ruleProjectId === projectId;
      }
    }

    let branchMatches = true;
    if (branchPattern) {
      try {
        const regex = new RegExp(branchPattern);
        branchMatches = regex.test(targetBranch);
      } catch {
        throw new Error(`Некорректное регулярное выражение в targetBranch: ${branchPattern}`);
      }
    }

    if (projectIdMatches && branchMatches) {
      (actions.addHashtags || []).forEach((ht) => hashtags.add(ht));
      (actions.removeHashtags || []).forEach((ht) => hashtags.delete(ht));
    }
  });

  return hashtags;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}
