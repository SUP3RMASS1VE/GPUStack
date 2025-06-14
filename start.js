module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        env: { },                   // Edit this to customize environment variables (see documentation)
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "gpustack start --port 7860",    // Edit with your custom commands
        ],
        on: [{
          "event": "/Serving on \\d+\\.\\d+\\.\\d+\\.\\d+:(\\d+)/i", 
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "http://localhost:7860"
      }
    },
    {
      method: "browser.open",
      params: {
        url: "{{local.url}}"
      }
    },
    {
      method: "shell.run",
      params: {
        message: "start \"\" \"{{local.url}}\""
      }
    }
  ]
}
