async function getSettings() {
  return (await chrome.storage.local.get(['settings']))?.settings ??
    {
      ck_gh_branch_create_save_values: true,
      ck_gh_branch_create_console_copy: true,
    }

}
