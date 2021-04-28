window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })

  //  // 安装的图标，默认 build/installerIcon.ico或者应用的图标
  //  "uninstallerIcon": "./public/abs.ico",// 卸载的图标，默认build/uninstallerIcon.ico或者应用的图标
  //  "installerHeader": "./public/abs.ico",// 安装的头部，默认build/installerHeader.bmp
  //  "installerHeaderIcon": "./public/abs.ico",//安装包头部的涂票，默认build/installerHeaderIcon.ico
  //  "installerSidebar": "./build/sidebar.bmp",// 安装包安装侧边图片，默认build/installerSidebar.bmp，要求164 × 314 像素
  //  "uninstallerSidebar": "./build/sidebar.bmp"// 安装包卸载侧边图片，默认build/installerSidebar.bmp，要求164 × 314 像素