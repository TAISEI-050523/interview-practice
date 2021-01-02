'use strict'

{
  // 「質問text」
  const images = [
    'texts/text00.png',
    'texts/text01.png',
    'texts/text02.png',
    'texts/text03.png',
    'texts/text04.png',
    'texts/text05.png',
    'texts/text06.png',
    'texts/text07.png',
    'texts/text08.png',
    'texts/text09.png',
    'texts/text10.png',
    'texts/text11.png',
    'texts/text12.png',
    'texts/text13.png',
    'texts/text14.png'
  ];

  // 初期状態で表示されている質問textを定義
  let currentIndex = 0;
  // 「うんうん」・「なるほど分かりました！」・「質問text」を定義
  const noneImage = document.getElementById('none-image'); 
  const nextImage = document.getElementById('next-image');
  const mainImage = document.getElementById('main-image');
  mainImage.src = images[currentIndex];

  // タイマーボックスの各ボタンの定数を定義
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  const next = document.getElementById('next');
  const prev= document.getElementById('prev');

  // 初期状態のボタン表示
  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
    prev.classList.remove('inactive');
    next.classList.remove('inactive');
  }
  // タイマー計測中のボタン表示
  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
    prev.classList.add('inactive');
    next.classList.add('inactive');
  }
  // タイマー計測終了後のボタン表示
  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
    prev.classList.remove('inactive');
    next.classList.remove('inactive');
  }

  // タイマーの計測基準となる変数を定義
  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  // タイマーの表示を定義
  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    timer.textContent = `${m}分${s}秒`;
    // 1000ミリ秒(1秒)毎にカウント
    timeoutId = setTimeout(() => {
      countUp();
    }, 1000);
  }

  // ボタンを初期状態する
  setButtonStateInitial();

  // 「回答する」」のクリックで発火
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive')) {
      return;
    }
    // 「うんうん」を表示して、「質問text」、「なるほど分かりました！」を非表示
    mainImage.classList.add('hidden');
    noneImage.classList.remove('hidden');
    nextImage.classList.add('hidden');
    // 初期状態のボタン表示・現在時刻を計測開始時間とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  // 「回答終了」」のクリックで発火
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive')) {
      return;
    }
    // 「なるほど分かりました！」を表示して、「質問text」・「うんうん」を非表示
    mainImage.classList.add('hidden');
    noneImage.classList.add('hidden');
    nextImage.classList.remove('hidden');
    // タイマー計測終了後のボタン表示
    setButtonStateStopped();
    clearTimeout(timeoutId);
    // タイマーの発動されていた時間を加算
    elapsedTime += Date.now() - startTime;
  });

  // 「やり直す」」のクリックで発火
  reset.addEventListener('click', () => {;
    if (reset.classList.contains('inactive')) {
      return;
    }
    // 「質問text」を表示して、「うんうん」、「なるほど分かりました！」を非表示
    mainImage.classList.remove('hidden');
    noneImage.classList.add('hidden');
    nextImage.classList.add('hidden');
    // ボタンを初期状態・タイマーを初期状態にリセット
    setButtonStateInitial()
    timer.textContent = '00分00秒';
    elapsedTime = 0;
  });

  // 「次の質問」または「前の質問」のクリックで発火、表示される質問textを定義
  function currentImage(target) {
    currentIndex = target;
    mainImage.src = images[target];
  }

  // 「次の質問」のクリックで発火、現在表示されている質問textの配列連番に１を足す
  next.addEventListener('click', () => {
    let target = currentIndex + 1;
    if (target === images.length) {
      target = images.length - 1;
      alert("一番最後の質問です。面接は終了です。");
    }
    // 「質問text」を表示して、「うんうん」、「なるほど分かりました！」を非表示
    mainImage.classList.remove('hidden');
    noneImage.classList.add('hidden');
    nextImage.classList.add('hidden');
    currentImage(target);
    /// ボタンを初期状態・タイマーを初期状態にリセット
    setButtonStateInitial()
    timer.textContent = '00分00秒';
    elapsedTime = 0;
  });

  // 「次の質問」のクリックで発火、現在表示されている質問textの配列連番から１を引く
  prev.addEventListener('click', () => {
    let target = currentIndex - 1;
    if (target < 0 ) {
      target = 0;
      alert("一番先頭の質問です。");
    }
    // 「質問text」を表示して、「うんうん」、「なるほど分かりました！」を非表示
    mainImage.classList.remove('hidden');
    noneImage.classList.add('hidden');
    nextImage.classList.add('hidden');
    currentImage(target);
    // ボタンを初期状態・タイマーを初期状態にリセット
    setButtonStateInitial()
    timer.textContent = '00分00秒';
    elapsedTime = 0;
  });
}