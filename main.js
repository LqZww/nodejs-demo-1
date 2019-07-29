//①form
// button.addEventListener('click', (e) => {
//     var n = amount.innerText
//     let number = parseInt(n, 10)
//     let newNumber = number - 1
//     amount.innerText = newNumber
// })


//②image发请求法
// button.addEventListener('click', (e) => {
//     let image = document.createElement('img')
//     image.src = '/pay'
//     image.onload = function () {
//         alert('打钱成功')
//         amount.innerText = amount.innerText - 1

//     }
//     image.onerror = function () {
//         alert('打钱失败')
//     }
// })

//③script发请求法
button.addEventListener('click', (e) => {
    let script = document.createElement('script')
    script.src = '/pay'
    document.body.appendChild(script)
    script.onload = function (e) {
        e.currentTarget.remove()
    }
    script.onerror = function () {
        alert('fail')
        e.currentTarget.remove()
    }
})
