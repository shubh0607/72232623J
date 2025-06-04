function updateWindow(currentWindow, newNumbers, size) {
    const set = new Set(currentWindow);

    newNumbers.forEach(num => {
        if (!set.has(num)) {
            currentWindow.push(num);
            set.add(num);
        }
    });

    while (currentWindow.length > size) {
        currentWindow.shift(); // remove oldest
    }

    return currentWindow;
}

module.exports = { updateWindow };
