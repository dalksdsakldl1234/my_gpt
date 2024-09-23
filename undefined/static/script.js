document.addEventListener('DOMContentLoaded', function() {
    const guessInput = document.getElementById('guess-input');
    const submitGuess = document.getElementById('submit-guess');
    const results = document.getElementById('results');
    const imageContainer = document.getElementById('image-container');
    const images = document.querySelectorAll('.movable-image');
    
    // 버튼 click
    submitGuess.addEventListener('click', function() {
        const guess = guessInput.value;
        if (guess) {
            fetch('/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({guess: guess}),
            })
            .then(response => response.json())
            .then(data => {
                const resultElement = document.createElement('p');
                resultElement.textContent = `"${guess}"의 유사도: ${data.similarity}%`;
                results.prepend(resultElement);
                guessInput.value = '';
            });
        }
    });

    // 이미지 이동 기능
    let selectedImages = [];

    images.forEach(image => {
        image.addEventListener('click', function() {
            this.classList.toggle('selected');
            if (this.classList.contains('selected')) {
                selectedImages.push(this);
            } else {
                selectedImages = selectedImages.filter(img => img !== this);
            }

            if (selectedImages.length === 2) {
                swapImages(selectedImages[0], selectedImages[1]);
                selectedImages = [];
            }
        });
    });

    function swapImages(img1, img2) {
        console.log('Swapping images:', img1.src, img2.src);  // 디버깅을 위한 로그
        
        // 이미지의 src와 alt 속성을 교환
        const tempSrc = img1.src;
        const tempAlt = img1.alt;
        
        img1.src = img2.src;
        img1.alt = img2.alt;
        
        img2.src = tempSrc;
        img2.alt = tempAlt;

        // 선택 상태 제거
        img1.classList.remove('selected');
        img2.classList.remove('selected');

        console.log('Images swapped:', img1.src, img2.src);  // 디버깅을 위한 로그
    }

});


