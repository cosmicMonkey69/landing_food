window.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal'),
        btnShowModal = document.querySelectorAll('[data-modal]');

    function showModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        clearInterval(timerIdModal);
        window.removeEventListener('scroll', scrollShowModal);
        document.body.style.overflow = 'hidden';
    }

    function hideModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    window.addEventListener('scroll', scrollShowModal);

    function scrollShowModal () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
        }
    }

    const timerIdModal = setTimeout(showModal, 20000);
    scrollShowModal();
    btnShowModal.forEach((btn) => {
        btn.addEventListener('click', showModal);
    });

    modal.addEventListener('click', (e) => {
        if(e.target == modal || e.target.classList.contains('modal__close')) {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            hideModal();
        }
    });

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Success',
        failure: 'Failure'
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const statusMessage = document.createElement('div');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage)

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
                        
            postData('http://localhost:3000/requests', json)
            .then(data => {
                showThanksModal(message.success);
                console.log(data);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    forms.forEach(item => {
        bindPostData(item);
    });

    function showThanksModal (message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        modal.append(thanksModal);
        setTimeout(() => {
            hideModal();
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
        }, 4000);
    }

});