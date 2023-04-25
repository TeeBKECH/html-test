document.addEventListener('DOMContentLoaded', () => {
  // Форма
  // Проверка отправки данных (network -> payload)
  const form = document.querySelector('form')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const response = await fetch('/', {
      method: 'POST',
      body: formData,
    })
  })

  // Range view
  const range = document.getElementById('range_id')
  const rangeOut = document.querySelector('#range_out')
  range.addEventListener('input', (e) => {
    rangeOut.innerText = e.target.value + '%'
  })

  // Кастомный селект
  document.querySelectorAll('.form_control--select').forEach((el) => {
    const select = el.querySelector('select')
    select.classList.add('hide-select')
    el.classList.add('select')

    const selectOptions = select.querySelectorAll('option')
    const htmlCustomSelect = document.createElement('div')
    const htmlCustomOptions = document.createElement('ul')

    htmlCustomSelect.classList.add('custom-select')
    htmlCustomOptions.classList.add('custom-options')

    el.appendChild(htmlCustomSelect)
    el.appendChild(htmlCustomOptions)

    const customSelect = el.querySelector('.custom-select')
    customSelect.innerText = select.childNodes[1].label

    for (let i = 0; i < selectOptions.length; i++) {
      const option = document.createElement('li')
      option.innerText = selectOptions[i].innerText
      option.setAttribute('rel', selectOptions[i].innerText)
      htmlCustomOptions.appendChild(option)
    }
    const optionlistItems = htmlCustomOptions.childNodes
    optionlistItems[0].classList.add('active')

    customSelect.addEventListener('click', function (e) {
      e.stopPropagation()
      htmlCustomSelect.classList.toggle('active')
    })

    const clearActiveClass = (arr) => {
      return arr.forEach((el) => el.classList.remove('active'))
    }

    optionlistItems.forEach((optionItem) => {
      optionItem.addEventListener('click', function (e) {
        e.stopPropagation()
        clearActiveClass(optionlistItems)
        e.currentTarget.classList.add('active')
        customSelect.innerText = e.currentTarget.innerText
        select.value = e.currentTarget.getAttribute('rel')
        customSelect.classList.remove('active')
      })
    })

    document.addEventListener('click', function () {
      customSelect.classList.remove('active')
    })
  })

  // Гамбургер и мобильное меню
  const hamburger = document.querySelector('.toggle')
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      document.querySelectorAll('.toggle_item').forEach((el) => {
        if (el.classList.contains('open')) {
          el.classList.remove('open')
          el.classList.add('close')
        } else if (el.classList.contains('close')) {
          el.classList.remove('close')
          el.classList.add('open')
        } else {
          el.classList.add('open')
        }
      })
      document.querySelector('.header_nav').classList.toggle('active')
    })
  }
})
