class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);        // кнопки открытия плеера
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');      // кнопка закрытия плеера        
    }

    bindTriggers() {
        this.btns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                    this.activeBtn = btn;

                    if (document.querySelector('iframe#frame')) {       // условие чтобы каждый раз не создавать экземпляр класса
                        this.overlay.style.display = 'flex';
                        if (this.path !== btn.getAttribute('data-url')) {   // если плеер ранее запускался, и уже имеет ссылку, переписываем на новую ссылку из дата атрибута .
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});  // (из YouTube iframe player API) функция служит для загрузки и воспроизведения указанного видео /
                        }
                    } else {                                            // иначе если ранее плеер не запускался ,
                        this.path = btn.getAttribute('data-url');      // берем url c data-атрибута кнопки открытия плеера
    
                        this.createPlayer(this.path);
                    }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }

    createPlayer(url) {                         // из YouTube iframe player API
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
              }
        });

        this.overlay.style.display = 'flex';
    }

    init() {
        if (this.btns.length > 0) {                                               // проверяем передавались ли кнопки открытия плеера
            const tag = document.createElement('script');                         // из YouTube iframe player API
            tag.src = "https://www.youtube.com/iframe_api";                       //  -//-
            const firstScriptTag = document.getElementsByTagName('script')[0];    //  -//-
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);          //  -//-
    
            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}
new VideoPlayer('.about__video', '.overlay').init();