function createFilter(context, frequency, gainValue) {
    var filter = context.createBiquadFilter(); // Создаем фильтр

    filter.type = 'peaking'; // тип фильтра
    filter.frequency.value = frequency; // частота
    filter.gain.value = gainValue; // сила
    filter.Q.value = 1; // Q-фактор

    return filter;
}

// Ловим клик на browserAction (увы, только так, через tabs.onUpdated нельзя)
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabCapture.capture({ // Захватываем вкладку
        audio: true, // аудио трогаем
        video: false // видео нет
    }, function(stream) { // callback с захватом
        var context = new AudioContext(), // Создаем AudioContext
            source = context.createMediaStreamSource(stream); // Создаем источник звука

        source.connect(createFilter(context, 60, 12)) // Выводим источник
            .connect(createFilter(context, 170, 8)) // Через фильтры
            .connect(createFilter(context, 310, 8))
            .connect(context.destination); // В динамики
    });
});
