const copyToClipBoard = (event: any, dataToCopy: any, currentX: number) => {
    const persistsPosition = setInterval(() => {
        document.documentElement.scrollTop = currentX;
    }, 1);

    try {
        event.preventDefault();
        event.persist();

        if (null !== document.getElementById('copy-to-clipboard')) {
            const node: any = document.getElementById('copy-to-clipboard')
            node.value = dataToCopy;
            node.select();
            document.execCommand('copy');
            node.focus();
            event.target.classList.add('copied');

            setTimeout(() => {
                event.target.classList.add('copied-remove');

                setTimeout(() => {
                    event.target.classList.remove('copied');
                    event.target.classList.remove('copied-remove');
                    clearInterval(persistsPosition);
                }, 300);
            }, 200);
        }
    } catch (error) {
        clearInterval(persistsPosition);
    }
};

export default copyToClipBoard;