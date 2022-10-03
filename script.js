/*
ДЗ 6: Создать объектно-ориентированное приложение Тамагочи.
Требования:
1.Кпопка, нажав на которую создается тамагочи.
При повторном нажатии создается еще один.
2. У Тамагочи есть очки жизни, Эти очки непрерывно уменьшаются. Если доходят до нуля, тамагочи умирает. 
3. У каждого тамагочи есть кнопка "Покормить" при нажатии, жизненные силы восстанавливаются. 20%
*/

class Tamagachi {
    constructor(info) {
        //жизнь и перевод в число
        this.health = info.hp;
        this.name = info.name;
        this.bone = '<img src="./img/game_skull_head_skull_dead_die_death_icon_133746.png" alt="" class="content__item-img">';
        this.cemetry = '<img src="./img/death_covid_coronavirus_dead_die_graveyard_tomb_icon_143389.png" alt="" class="content__item-img">';

        //определение элемента и его класс
        this.item = document.createElement('div');
        this.item.className = 'content__item';

        //определение имени, класс, содержание
        this.title = document.createElement('h4');
        this.title.className = 'content__item-name';
        this.title.innerHTML = this.name;
        this.item.append(this.title);

        //фото, класс, передача изображения, добавление
        this.imgBox = document.createElement('div');
        this.imgBox.className = 'content__item-img-box';
        this.imgBox.innerHTML = info.view;
        this.item.append(this.imgBox);

        //статус: создание, класс, добавление
        this.healtStatus = document.createElement('p');
        this.healtStatus.className = 'content__item-health';
        this.item.append(this.healtStatus);

        //лечение создание, класс, добавление
        this.btnTreat = document.createElement('button');
        this.btnTreat.className = 'content__item-btn-treat content__item-btn';
        this.btnTreat.innerHTML = 'Treat';
        this.item.append(this.btnTreat);
        this.btnTreat.addEventListener('click', ()=> this.treating());

        //хоронение создание, класс
        this.btnRip = document.createElement('button');
        this.btnRip.className = 'content__item-btn-rip content__item-btn';
        this.btnRip.innerHTML = 'RIP';
        this.btnRip.addEventListener('click', ()=> this.rip());

        this.render();
        this.counter();
    }

    counter() {
        //метод для подсчета жизней с таймером
        let timer = setInterval(() => {
            this.health -=1;

            if (this.health === 0) {
                this.btnTreat.remove();
                this.imgBox.innerHTML = this.bone;
                this.item.append(this.btnRip);
                clearInterval(timer);
            }

            this.render();
        }, 50);
    }

    rip() {
        //метод для хоронения персонажа
        this.imgBox.innerHTML = this.cemetry;
        this.healtStatus.innerHTML = 'RIP';
        this.btnRip.remove();
    }

    treating() {
        //метод для добавления здоровья персонажу
        this.health += 20;
        this.render();
    }

    render() {
        //метод для вывода статуса персонажа на экран
        this.healtStatus.innerHTML = `${this.health ? this.health : this.name + ' is died'}`;
    }
}

const members = [
    {
        name: 'Pica',
        hp: '100',
        view: '<img src="./img/188987.png" alt="" class="content__item-img">'
    },
    {
        name: 'Bulba',
        hp: '120',
        view: '<img src="./img/bulbasaur_icon-icons.com_67580.png" alt="" class="content__item-img">'
    },
    {
        name: 'Eevee',
        hp: '80',
        view: '<img src="./img/eevee_icon-icons.com_67563.png" alt="" class="content__item-img">'
    },
    {
        name: 'Jigglypuff',
        hp: '70',
        view: '<img src="./img/jigglypuff_icon-icons.com_67550.png" alt="" class="content__item-img">'
    },
    {
        name: 'Meowth',
        hp: '130',
        view: '<img src="./img/meowth_icon-icons.com_67543.png" alt="" class="content__item-img">'
    },
    {
        name: 'Snorlax',
        hp: '200',
        view: '<img src="./img/snorlax_icon-icons.com_67505.png" alt="" class="content__item-img">'
    }
];

function randomMember() {
    //метод для рандомного выбора персонажа
    return members[Math.floor(Math.random() * (members.length))];
}

const content = document.querySelector('.content');

document.querySelector('.create-link')
    .addEventListener(
        'click',
        (e)=> {
            const info = randomMember();
            e.preventDefault();
            content.append((new Tamagachi(info)).item);
        }
    );




