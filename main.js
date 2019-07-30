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
// button.addEventListener('click', (e) => {
//     let script = document.createElement('script')
//     script.src = '/pay'
//     document.body.appendChild(script)
//     script.onload = function (e) {
//         e.currentTarget.remove()
//     }
//     script.onerror = function () {
//         alert('fail')
//         e.currentTarget.remove()
//     }
// })




//①JSONP
// button.addEventListener('click', (e) => {
//     let script = document.createElement('script')

//     //随机数
//     let functionName = 'zhouwanwen' + parseInt(Math.random() * 100000, 10)
//     window[functionName] = function (result) {
//         if (result === 'success') {
//             amount.innerText = amount.innerText - 1
//         } else {

//         }
//     }
//     script.src = 'http://jack.com:8002/pay?callback=' + functionName
//     document.body.appendChild(script)
//     script.onload = function (e) {
//         e.currentTarget.remove()
//         delete window[functionName]
//     }
//     script.onerror = function () {
//         alert('fail')
//         e.currentTarget.remove()
//         delete window[functionName]
//     }
// })

//②使用jQuery实现JSONP
button.addEventListener('click', (e) => {
    $.ajax({
        url: "http://jack.com:8002/pay",
        dataType: "jsonp",
        success: function (response) {
            if (response === 'success') {
                amount.innerText = amount.innerText - 1
            }
        }
    })
})
