(async () => {
  let settings = await getSettings()

  console.log(settings)

  for (const [key, val] of Object.entries(settings)) {
    const checkbox = document.querySelector(`#${key}`)
    checkbox.checked = !!val

    checkbox.addEventListener('change', async (event) => {
      const newSettings = {
        ...settings,
        [event.target.id]: event.target.checked,
      }
      chrome.storage.local.set({
        settings: newSettings,
      })

      settings = newSettings
    })
  }

  document.querySelector('#feature-list').style.display = 'block'
  document.querySelector('#feature-list-loading').style.display = 'none'
})()
