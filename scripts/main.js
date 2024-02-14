var DateTime = luxon.DateTime;


(async function createGitHubBranchModifications() {

// When creating a GitHub branch via the UI
  if (window.location.host !== 'github.atlassian.com' || window.location.pathname !== '/github/create-branch') {
    return
  }

  const settings = await getSettings()

  if (settings.ck_gh_branch_create_console_copy) {
    injectStyle('.css-1r3sre2:hover { rgba(9, 30, 66, 0.08) }')

    const branchCreatedListener = setInterval(() => {
      if (document.querySelector('.gitHubCreateBranch__header').innerHTML === 'GitHub branch created') {

        const newBranchName = document.querySelector('.gitHubCreateBranch__subHeader b').innerHTML

        document.querySelector('#createBranchForm').insertAdjacentHTML('afterend', getInputCopyHTML(`git fetch && git checkout ${newBranchName}`))

        clearInterval(branchCreatedListener)
      }
    }, 100)
  }

  if (!settings.ck_gh_branch_create_save_values) {
    return
  }

  document.querySelector('#createBranchBtn').addEventListener('click', function (event) {
    console.info('Saved default values for Github Branch Creation')
    chrome.storage.local.set({
      create_github_branch: {
        repo: document.querySelector('input#ghRepo').value,
        branch: document.querySelector('input#ghParentBranch').value,
      },
    })
  })

  const { repo, branch } = (await chrome.storage.local.get(['create_github_branch']))?.create_github_branch ?? {}

  if (!repo || !branch) return

  document.querySelector('input#ghRepo').value = repo
  document.querySelector('input#ghParentBranch').value = branch

  document.querySelector('#s2id_ghRepo .select2-chosen').innerHTML = repo
  document.querySelector('#s2id_ghParentBranch .select2-chosen').innerHTML = branch

  document.querySelector('#s2id_ghRepo a').classList.remove('select2-default')
  document.querySelector('#s2id_ghParentBranch a').classList.remove('select2-default')

  console.info('Loaded previous default values for Github Branch Creation')
})()


function getInputCopyHTML(text) {
  return `
  <div style="display: flex; margin-top: 8px">
    <div style="flex-grow: 1; margin-right: 8px;">
        <div role="presentation" data-ds--text-field--container="true"
             data-testid="platform-copy-text-field.textfield---container" class="css-1s25hsw" style="    -webkit-box-align: center;
    align-items: center;
    background-color: var(--ds-background-input, #FAFBFC);
    border-color: var(--ds-border-input, #DFE1E6);
    color: var(--ds-text, #091E42);
    cursor: text;
    border-radius: 3px;
    border-width: 2px;
    border-style: solid;
    box-sizing: border-box;
    display: flex;
    flex: 1 1 100%;
    font-size: 14px;
    -webkit-box-pack: justify;
    justify-content: space-between;
    max-width: 100%;
    overflow: hidden;
    transition: background-color 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s;
    overflow-wrap: break-word;
    vertical-align: top;
    pointer-events: auto;">
            <input
                    data-ds--text-field--input="true" data-testid="platform-copy-text-field.textfield--" readonly=""
                    class="css-1cab8vv"
                    value="${text}"
                    style="
                        outline: 0;
                        border-bottom-right-radius: 3.01px;
                            padding: var(--ds-space-100, 8px) var(--ds-space-075, 6px);
                        height: 2.57em;
                            background-color: transparent;
                        border: 0px;
                        box-sizing: border-box;
                        color: inherit;
                        cursor: inherit;
                        font-size: 14px;
                        min-width: 0px;
                        outline: none;
                        width: 100%;
                        line-height: 1.42857;
           "/>
        </div>
    </div>
    <span role="presentation">
            <button class="css-1r3sre2" data-testid="platform-copy-text-field.styled-button-"
                    tabindex="0" type="button"
                    style="
                        -webkit-box-align: baseline;
                        align-items: baseline;
                        border-width: 0px;
                        border-radius: var(--ds-border-radius, 3px);
                        box-sizing: border-box;
                        display: inline-flex;
                        font-size: inherit;
                        font-style: normal;
                        font-family: inherit;
                        font-weight: 500;
                        max-width: 100%;
                        position: relative;
                        text-align: center;
                        text-decoration: none;
                        transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
                        white-space: nowrap;
                        background: var(--ds-background-neutral, rgba(9, 30, 66, 0.04));
                        cursor: pointer;
                        height: 40px;
                        line-height: 2.28571em;
                        padding: 0px 2px;
                        vertical-align: middle;
                        width: 40px;
                        -webkit-box-pack: center;
                        justify-content: center;
                        outline: none;
                        color: var(--ds-text, #42526E) !important;
                    "
                    onclick="let inp =document.createElement('input');
                      document.body.appendChild(inp)
                      inp.value ='${text}'
                      inp.select();
                      document.execCommand('copy',false);
                      inp.remove();
                      document.querySelector('#svgCopy').style.display = 'none'
                      document.querySelector('#svgCopied').style.display = 'block'
                      setTimeout(() => {
                        document.querySelector('#svgCopy').style.display = 'block'
                        document.querySelector('#svgCopied').style.display = 'none'
                      }, 500)
                      ">
            <span
                    class="css-bwxjrz"
                    style="
                        opacity: 1;
                        transition: opacity 0.3s ease 0s;
                        display: flex;
                        margin: 0px 2px;
                        -webkit-box-flex: 0;
                        flex-grow: 0;
                        flex-shrink: 0;
                        align-self: center;
                        font-size: 0px;
                        line-height: 0;
                        user-select: none;
                    "
            >
            <span role="img"
                  aria-label="Copy icon"
                  class="css-snhnyn"
                  style="--icon-primary-color: currentColor; --icon-secondary-color: var(--ds-surface, #FFFFFF);">
                <svg id="svgCopy"
                        width="24" height="24" viewBox="0 0 24 24" role="presentation"
                        style="display: inline-block; flex-shrink: 0; line-height: 1;">
                <g fill="currentColor">
                    <path
                            d="M10 19h8V8h-8v11zM8 7.992C8 6.892 8.902 6 10.009 6h7.982C19.101 6 20 6.893 20 7.992v11.016c0 1.1-.902 1.992-2.009 1.992H10.01A2.001 2.001 0 018 19.008V7.992z"></path><path
                        d="M5 16V4.992C5 3.892 5.902 3 7.009 3H15v13H5zm2 0h8V5H7v11z">
                </path>
                </g>
            </svg>
            <svg id="svgCopied" width="24" height="24" style="display: none; color: rgb(54,179,126)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            </span>
            </span>
            </button>
        </span>
</div>
`
}

function injectStyle(css) {
  const styleElem =  document.querySelector('head style')

  if(styleElem) {
    styleElem.insertAdjacentHTML('beforeend', `\n${css}`)
  } else {
    document.querySelector('head').insertAdjacentHTML('beforeend', `<style>${css}</style>`)
  }
}
