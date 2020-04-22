const saveButton = document.getElementById('checkbox_save');
let username = document.getElementById('input_username');

(async () => {
    isChecked = await localStorage.getItem('save_username');
    saveButton.checked = isChecked;
    username.value = (isChecked) ? await localStorage.getItem('username') : '';
})();

const urlButton = document.getElementById('button_url');
urlButton.addEventListener('click', (event) => {
  const shell = require("electron").shell;
  event.preventDefault();
  shell.openExternal('');
});

const closeButton = document.getElementById('button_close');
closeButton.addEventListener('click', async (event) => {
  const remote = require('electron').remote;
  const window = remote.getCurrentWindow();

  await localStorage.setItem('save_username', saveButton.checked);

  if (saveButton.checked) {
    await localStorage.setItem('username', username.value);
    await localStorage.setItem('save_username', saveButton.checked);
  } else {
    await localStorage.setItem('username', '');
    await localStorage.setItem('save_username', saveButton.checked);
  }

  window.close();
});

const startButton = document.getElementById('button_start');
startButton.addEventListener('click', async (event) => {
  const password = document.getElementById('input_password').value;

  openClient(username.value, password.value);

  if (saveButton.checked) {
    return localStorage.setItem('username', username.value);
  }

  await localStorage.setItem('username', '');
  return localStorage.setItem('save_username', saveButton.checked);
});

const openClient = (username, password) => {
    const childProcess = require('child_process');

    const command = "cmd";
    const cliArguments = [
      '/s',
      '/c',
      'start',
      '""',
      '/b',
      '/wait',
      '"RagExe.exe"',
      `-t:${password} ${username} 1rag1`,
      '"RagExe.exe"'
    ];
    const childProcessOptions = { windowsVerbatimArguments: true };
    const subprocess = childProcess.spawn(command, cliArguments, childProcessOptions);
};
