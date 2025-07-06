document.addEventListener('DOMContentLoaded', async function() {
  const notesContainer = document.getElementById('notesContainer');
  const notesDir = './notes/html/';
  const doroImgDir = './resource/img/dror/';
  
  // 动态加载笔记列表
  async function loadNotes() {
    try {
      // 先清空加载提示
      notesContainer.innerHTML = '';
      
      // 获取笔记HTML文件列表
      const response = await fetch('./api/notes.json');
      
      // 如果API不可用，使用备用的硬编码笔记列表
      if (!response.ok) {
        useBackupNotesList();
        return;
      }
      
      const notes = await response.json();
      
      // 如果笔记列表为空，使用备用列表
      if (!notes || notes.length === 0) {
        useBackupNotesList();
        return;
      }
      
      // 创建笔记卡片
      notes.forEach(note => {
        createNoteCard(note);
      });
      
    } catch (error) {
      console.error('加载笔记失败:', error);
      useBackupNotesList();
    }
  }
  
  // 使用备用的硬编码笔记列表
  function useBackupNotesList() {
    // 硬编码已知的笔记和图片，避免依赖动态加载
    const backupNotes = [
      { 
        file: 'windos局域网共享目录.html',
        title: 'windos局域网共享目录',
        image: '微信图片_20250705195853.jpg'
      },
      { 
        file: 'CloudflareR2图片服务配置笔记.html',
        title: 'CloudflareR2图片服务配置笔记',
        image: '微信图片_20250705200003.jpg'
      },
      { 
        file: 'NginxStudy.html',
        title: 'Nginx Study',
        image: '微信图片_20250705200014.jpg'
      }
    ];
    
    // 清空容器
    notesContainer.innerHTML = '';
    
    // 创建笔记卡片
    backupNotes.forEach(note => {
      createNoteCard(note);
    });
  }
  
  // 创建笔记卡片
  function createNoteCard(note) {
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card';
    
    const noteLink = document.createElement('a');
    noteLink.href = `${notesDir}${note.file}`;
    
    const noteImg = document.createElement('div');
    noteImg.className = 'note-img';
    noteImg.style.backgroundImage = `url('${doroImgDir}${note.image}')`;
    
    const noteTitleDiv = document.createElement('div');
    noteTitleDiv.className = 'note-title';
    noteTitleDiv.textContent = note.title;
    
    noteLink.appendChild(noteImg);
    noteLink.appendChild(noteTitleDiv);
    noteCard.appendChild(noteLink);
    
    notesContainer.appendChild(noteCard);
  }
  
  // 尝试直接读取笔记目录
  async function scanNotesDirectory() {
    try {
      // 使用fetch尝试获取目录列表
      const response = await fetch('./notes/html/');
      
      if (!response.ok) {
        throw new Error('无法访问笔记目录');
      }
      
      const html = await response.text();
      
      // 解析HTML以获取文件列表
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const links = doc.querySelectorAll('a');
      
      const notes = [];
      
      // 过滤出HTML文件
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.endsWith('.html')) {
          // 提取文件名
          const fileName = href;
          
          // 生成标题（去除.html和md后缀）
          let title = fileName.replace(/\.html$/, '').replace(/md$/, '');
          
          // 随机选择一个图片
          const randomIndex = Math.floor(Math.random() * 8) + 1;
          const image = `微信图片_2025070520000${randomIndex}.jpg`;
          
          notes.push({
            file: fileName,
            title: title,
            image: image
          });
        }
      });
      
      return notes;
    } catch (error) {
      console.error('扫描目录失败:', error);
      return null;
    }
  }
  
  // 初始化函数
  async function init() {
    // 尝试扫描目录
    const scannedNotes = await scanNotesDirectory();
    
    if (scannedNotes && scannedNotes.length > 0) {
      // 清空容器
      notesContainer.innerHTML = '';
      
      // 创建笔记卡片
      scannedNotes.forEach(note => {
        createNoteCard(note);
      });
    } else {
      // 如果扫描失败，使用备用方法
      loadNotes();
    }
  }
  
  // 启动初始化
  init();
}); 