module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/gpustack/gpustack.git app"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "python -m venv env"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "curl -L -o gpustack-ui-latest.tar.gz https://gpustack-ui-1303613262.cos.accelerate.myqcloud.com/releases/latest.tar.gz",
          "tar -xzf gpustack-ui-latest.tar.gz -C gpustack/",
          "mv gpustack/dist gpustack/ui",
          "rm gpustack-ui-latest.tar.gz"
        ]
      }
    },
    {
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "pwsh -ExecutionPolicy Bypass -File hack/windows/install.ps1"
      }
    },
    {
      when: "{{platform === 'darwin'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "bash hack/install.sh"
      }
    },
    {
      when: "{{platform === 'linux'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "bash hack/install.sh"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -e .",
        ]
      }
    }
  ]
}
