// Фунцкия создания нового элемента
function createNewElement(element, className) {
  let el = document.createElement(element)
  el.classList.add(className)
  return el
}

// фунцкия добавления нового поля ввода

function getInput(type, placeholder) {
  let inp = createNewElement('input', 'input')
  inp.placeholder = placeholder
  inp.type = type
  return inp
}

// функция добавления новой кнопки

function getButton(text) {
  let btn = createNewElement('button', 'btn')
  btn.textContent = text
  return btn
}

//Функция записи студента из массива в таблицу
function renderStudents(array) {
  table.innerHTML = ''
  row.append(nameTd, facultyTd, ageTd, studyingTd, actionTd)
  table.append(row)

  for (let student of array) {
    let row = printOneRow(student)
    table.append(row)
  }
  return table
}

// Функция сортировки массива студентов

function sortStudents(array, prop, dir = false) {
  let newArray = array.sort(function (a, b) {
    let dirIF = a[prop] < b[prop];
    if (dir == true) dirIF = a[prop] > b[prop]
    if (dirIF == true) return -1;
  })
  return newArray
}

// функция фильтрации массива студентов
function getFilter(array, prop, value) {
  let newArray = []
  for (item of array) {
    if (String(item[prop]).includes(value)) newArray.push(item)
  }
  return newArray
}

// Функция получения полного имени имени
function getFIO(object) {
  return `${object.lastname} ${object.name} ${object.surname}`
}

// Функиция получения даты рождения
function getBirthDate(object) {
  const yyyy = new Date(object.dateOfBirth).getFullYear()
  let mm = new Date(object.dateOfBirth).getMonth() + 1
  let dd = new Date(object.dateOfBirth).getDate()
  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm
  return dd + '.' + mm + '.' + yyyy
}

// Функция получения возраста
function getAge(object) {
  const today = new Date()
  let age = today.getFullYear() - new Date(object.dateOfBirth).getFullYear()
  let month = today.getMonth() - new Date(object.dateOfBirth).getMonth()
  if (month < 0 || (month === 0 && today.getDate() < new Date(object.dateOfBirth).getDate()))   age--
  return age
}

// функция получения номера курса
function getCourse(object) {
  const today = new Date()
  let course = today.getFullYear() - object.yearStartStud
  if (today.getMonth() >= 8) course++
  if (course > 4) course = 'Уже закончил обучение'
  if (course < 1) course = 'Еще не поступил'
  if (course < 4 && course > 0) course = `курс: ${course}`
  return course
}

// функция присовения уникального ID для каждого студента
function getNewId (arr) {
  let max = 0;
  for (let item of arr) {
    if (item.id > max) max = item.id
  }
  return max + 1;
}

//Функция создания одной строки таблицы студентов
function printOneRow(object) {
  let row = createNewElement('tr')

  let nameTd = createNewElement('td')
  nameTd.textContent = getFIO(object)

  let facultyTd = createNewElement('td')
  facultyTd.textContent = `${object.faculty} `

  let dateOfBirth = getBirthDate(object)
  let ageTd = createNewElement('td')
  let age = getAge(object)
  ageTd.textContent = `Дата рождения: ${dateOfBirth}, возраст: ${age}`

  let dateOfStartStud = Number(object.yearStartStud)
  let studyingTd = createNewElement('td')
  let course = getCourse(object)

  studyingTd.textContent = `Годы обучения: ${dateOfStartStud} - ${dateOfStartStud + 4}, ${course}`

  let btnTd = createNewElement('td')
  let btn = createNewElement('button')
  btn.classList.add('btn-delete')
  btn.textContent = 'Удалить'
  btnTd.append(btn)

  btn.addEventListener('click', function () {
    if(confirm( 'Действительно хотите удалить этого студента из таблицы?')) {
      row.remove()


      for (let i = 0; i < studentsArray.length; i++) {
        if (studentsArray[i].id == object.id) studentsArray.splice(i, 1)
      }

      localStorage.setItem('students-list', JSON.stringify(studentsArray))
    }
  })

  row.append(nameTd, facultyTd, ageTd, studyingTd, btnTd)
  return row
}

// Cоздаем оболочку всего поля
let container = createNewElement('div', 'container')

let maintitle = createNewElement('h2', 'main-title')
maintitle.textContent = 'Список студентов'

//Coздаем оболочку для форм ввода и фильтрации
let formsWrap = createNewElement('div', 'forms-wrap')

//Coздаем оболочку для ввода нового студента

let inputBox = createNewElement('form', 'form-box')
let addtitle = createNewElement('h3', 'add-title')
addtitle.textContent = 'Добавьте нового студента в таблицу '
let inputBoxWrap = createNewElement('div')
let inputLastnameWrap = createNewElement('div', 'input-wrap')
let inputLastname = getInput('text', 'Введите фамилию')
let lastnameErrorLabel = createNewElement('label', 'error')
inputLastnameWrap.append(lastnameErrorLabel, inputLastname)


let inputNameWrap = createNewElement('div', 'input-wrap')
let inputName = getInput('text', 'Введите имя')
let nameErrorLabel = createNewElement('label', 'error')
inputNameWrap.append(nameErrorLabel, inputName)


let inputSurnameWrap = createNewElement('div', 'input-wrap')
let inputSurname = getInput('text', 'Введите отчество')
let surnameErrorLabel = createNewElement('label', 'error')
inputSurnameWrap.append(surnameErrorLabel, inputSurname)

let inputDateWrap = createNewElement('div', 'input-wrap')
let inputDate = getInput('text', 'Введите дату рождения')
inputDate.onfocus = function () {
  this.type = 'date'
  this.min = '1990-01-01'
}
let dateErrorLabel = createNewElement('label', 'error')
inputDateWrap.append(dateErrorLabel, inputDate)

let inputYearStartWrap = createNewElement('div', 'input-wrap')
let inputYearStart = getInput('number', 'Введите год начала обучения')
inputYearStart.min = 2000
let yearErrorLabel = createNewElement('label', 'error')
inputYearStartWrap.append(yearErrorLabel, inputYearStart)

let inputFacultyWrap = createNewElement('div', 'input-wrap')
let inputFaculty = getInput('text', 'Введите факультет')
let facultyErrorLabel = createNewElement('label', 'error')
inputFacultyWrap.append(facultyErrorLabel, inputFaculty)

let addNewStud = getButton('Добавить студента')

inputBoxWrap.append(addtitle,
  inputLastnameWrap,
  inputNameWrap,
  inputSurnameWrap,
  inputDateWrap,
  inputYearStartWrap,
  inputFacultyWrap)

inputBox.append(inputBoxWrap, addNewStud)

// Создаем оболочку для фильтрации
let filterBox = createNewElement('form', 'form-box')
let filtertitle = createNewElement('h3', 'add-title')
filtertitle.textContent = 'Поиск по таблице '
let inputWrap = createNewElement('div')

let filterNameWrap = createNewElement('div', 'input-wrap')
let filterName = getInput('text', 'Поиск по ФИО')
filterNameWrap.append(filterName)

let filterFacultyWrap = createNewElement('div', 'input-wrap')
let filterFaculty = getInput('text', 'Поиск по факультету')
filterFacultyWrap.append(filterFaculty)

let filterStartYearWrap = createNewElement('div', 'input-wrap')
let filterStartYear = getInput('number', 'Поиск по году начала обучения')
filterStartYearWrap.append(filterStartYear)

let filterFinishYearWrap = createNewElement('div', 'input-wrap')
let filterFinish = getInput('number', 'Поиск по году окончания обучения')
filterFinishYearWrap.append(filterFinish)

let filterBtn = getButton('Фильтровать')

//отрисовка фильтрованной таблицы
filterBox.addEventListener('submit', function (el) {
  el.preventDefault()
  let newArr = [...studentsArray]
  if (filterName.value != "") newArr = getFilter(newArr, 'fullname', filterName.value)
  if (filterFaculty.value != "") newArr = getFilter(newArr, 'faculty', filterFaculty.value)
  if (filterStartYear.value != "") newArr = getFilter(newArr, 'yearStartStud', filterStartYear.value)
  if (filterFinish.value != "") newArr = getFilter(newArr, 'yearFinishStud', filterFinish.value)

  renderStudents(newArr)
})

inputWrap.append(filtertitle, filterNameWrap, filterFacultyWrap, filterStartYearWrap, filterFinishYearWrap)
filterBox.append(inputWrap, filterBtn)

// Создаем таблицу со списком студентов
let table = createNewElement('table')
let row = createNewElement('tr')

let nameTd = createNewElement('td')
nameTd.textContent = 'Фамилия И.О.'

let facultyTd = createNewElement('td')
facultyTd.textContent = 'Факультет'

let ageTd = createNewElement('td')
ageTd.textContent = 'Дата рождения и возраст'

let studyingTd = createNewElement('td')
studyingTd.textContent = 'Годы обучения и курс'

let actionTd = createNewElement('td')
actionTd.textContent = 'Действие'

row.append(nameTd, facultyTd, ageTd, studyingTd, actionTd)
table.append(row)

//отрисовываем все созданные элементы страницы
formsWrap.append(inputBox, filterBox)
container.append(maintitle,formsWrap, table)
document.body.append(container)

//Задаем начальный список студентов дял проверки работоспособности(можно удалить и оставить пустой массив)


let studentsArray = []

let data = localStorage.getItem('students-list');

if(data !== '' && data !== null) {
  studentsArray = JSON.parse(data)
}

// Запуск отрисовки таблицы со списком по умолчанию
renderStudents(studentsArray)

// Добавляем по студента по клику
inputBox.addEventListener('submit', function (el) {
  el.preventDefault();

  //Валидация полей ввода
  let validationResult = false

  //фамилиии
  lastnameErrorLabel.textContent = ""
  if (inputLastname.value.trim().length < 2) {
    lastnameErrorLabel.textContent = "Фамилия должна содержать более 2х символов"
    validationResult = true
  }

  if (inputLastname.value.trim() == '') {
    lastnameErrorLabel.textContent = "Введите фамилию"
    validationResult = true
  }

  //имени
  nameErrorLabel.textContent = ""
  if (inputName.value.trim().length < 2) {
    nameErrorLabel.textContent = "Имя должно содержать более 2х символов"
    validationResult = true
  }

  if (inputName.value.trim() == '') {
    nameErrorLabel.textContent = "Введите имя"
    validationResult = true
  }

  //отчества
  surnameErrorLabel.textContent = ""
  if (inputSurname.value.trim().length < 2) {
    surnameErrorLabel.textContent = "Отчество должно содержать более 2х символов"
    validationResult = true
  }

  if (inputSurname.value.trim() == '') {
    surnameErrorLabel.textContent = "Введите отчество"
    validationResult = true
  }

  // даты рождения
  dateErrorLabel.textContent = ""
  if (inputDate.value == '') {
    dateErrorLabel.textContent = "Введите дату рождения"
    validationResult = true
  }

  // даты поступления
  yearErrorLabel.textContent = ""
  if (inputYearStart.value < 2000) {
    yearErrorLabel.textContent = "Дата поступления не позже 2000 года"
    validationResult = true
  }

  if (inputYearStart.value == '') {
    yearErrorLabel.textContent = "Введите дату поступления"
    validationResult = true
  }

  // факультета
  facultyErrorLabel.textContent = ""
  if (inputFaculty.value.trim().length < 2) {
    facultyErrorLabel.textContent = "Название факультета должно содержать более 2х символов"
    validationResult = true
  }

  if (inputFaculty.value.trim() == '') {
    facultyErrorLabel.textContent = "Введите название факультета"
    validationResult = true
  }

  // проверка состояния валидации всех полей
  if (validationResult == true) {
    return
  }

  let newStudent = {
    name: inputName.value,
    lastname: inputLastname.value,
    surname: inputSurname.value,
    fullname: `${inputLastname.value} ${inputName.value} ${inputSurname.value}`,
    dateOfBirth: new Date(inputDate.value),
    yearStartStud: Number(inputYearStart.value),
    yearFinishStud: `${Number(inputYearStart.value) + 4}`,
    faculty: inputFaculty.value,
    id: getNewId (studentsArray)
  }


  // добавляем нового студента в массив
  studentsArray.push(newStudent)

  localStorage.setItem('students-list', JSON.stringify(studentsArray))

  // вызываем функцию вывода массива студентов на экран
  renderStudents(studentsArray)

  // Очищаем поля ввода данных нового студента
  inputLastname.value = ''
  inputName.value = ''
  inputSurname.value = ''
  inputDate.value = ''
  inputYearStart.value = ''
  inputFaculty.value = ''

})

// направление сортировки таблицы
let direction = false

// сортировка списка и отрисовка таблицы
nameTd.addEventListener('click', () => {
  studentsArray = sortStudents(studentsArray, "lastname", direction)
  renderStudents(studentsArray)
  direction = !direction
})

facultyTd.addEventListener('click', () => {
  studentsArray = sortStudents(studentsArray, "faculty", direction)
  renderStudents(studentsArray)
  direction = !direction
})

ageTd.addEventListener('click', () => {
  studentsArray = sortStudents(studentsArray, "dateOfBirth", direction)
  renderStudents(studentsArray)
  direction = !direction
})

studyingTd.addEventListener('click', () => {
  studentsArray = sortStudents(studentsArray, "yearStartStud", direction)
  renderStudents(studentsArray)
  direction = !direction
})


