function reset_form() {
    document.getElementById('street').value = null
    document.getElementById('suburb').value = null
    document.getElementById('postcode').value = null
    document.getElementById('birth').value = null
    document.getElementById('building-type').selectedIndex = 0
    document.getElementById('output-text').innerHTML = null
    var checkbox = document.getElementsByClassName('check')
    for(var i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false
    }
}
function select_all() {
    if(document.getElementById('all').name == 'select') {
        document.getElementById('all').textContent = 'Deselect All'
        document.getElementById('all').name = 'deselect'
        var checkbox = document.getElementsByClassName('check')
        for(var i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = true
        }
    }
    else {
        document.getElementById('all').textContent = 'Select All'
        document.getElementById('all').name = 'select'
        var checkbox = document.getElementsByClassName('check')
        for(var i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = false
        }
    }
}
function check_street() {
    var text = document.getElementById('street').value
    if(text.length < 3 || text.length > 50) {
        return false
    }
    else {
        return true
    }
}
function check_suburb() {
    var text = document.getElementById('suburb').value
    if(text.length < 3 || text.length > 50) {
        return false
    }
    else {
        return true
    }
}
function check_num() {
    var text = document.getElementById('postcode').value
    if(text.length != 4) {
        return false
    }
    else {
        return true
    }
}
function check_DOB() {
    const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/
    var dob = document.getElementById("birth").value
    var list = dob.split('/')
    dob = list[1] + '/' + list[0] + '/' + list[2]
    if (!dob.match(pattern)) {
        return false
    } else {
        var date = Date.parse(dob)
        if (!isNaN(date)) {
            return true
        } else {
            return false
        }
    }
}
function get_age(text) {
    var list = text.split('/')
    text = list[1] + '/' + list[0] + '/' + list[2]
    var date = new Date(text)
    var diff = Date.now() - date.getTime()
    diff = new Date(diff)
    var year = diff.getUTCFullYear()
    var age = year - 1970
    return age
}
function check_all() {
    var checkbox = document.getElementsByClassName("check")
    var cnt = 0
    for(var i = 0; i < checkbox.length; i++) {
        if(checkbox[i].checked == true) {
            cnt++
        }
    }
    if(cnt == 4) {
        document.getElementById('all').textContent = 'Deselect All'
        document.getElementById('all').name = 'deselect'
    }
    else {
        document.getElementById('all').textContent = 'Select All'
        document.getElementById('all').name = 'select'
    }
    if (check_street() == false) {
        document.getElementById("output-text").innerHTML = "Please input a valid street name"
    } else if (check_suburb() == false) {
        document.getElementById("output-text").innerHTML = "Please input a valid suburb name"
    } else if (check_num() == false) {
        document.getElementById("output-text").innerHTML = "Please input a valid postcode"
    } else if (check_DOB() == false) {
        document.getElementById("output-text").innerHTML = "Please input a valid date of birth"
    }
    else {
        var str = "Your are "
        var DOB = document.getElementById("birth").value
        var age = get_age(DOB)
        str += age
        str += " years old, and your address is "
        var street = document.getElementById("street").value
        str += street
        str += " St, "
        var suburb = document.getElementById("suburb").value
        str += suburb
        str += ", "
        var postcode = document.getElementById("postcode").value
        str += postcode
        str += ", Australia. Your building is "
        var building = document.getElementById("building-type")
        var index = building.selectedIndex
        var select = building.options[index].innerText
        if(select == "Apartment") {
            str += "an "
        }
        else {
            str += "a "
        }
        str += select
        str += ", and it has "
        var checkbox = document.getElementsByClassName("check")
        var cnt = 0
        var first = true
        var features = []
        for(var i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked == true) {
                cnt++
                features.push(checkbox[i].value)
            }
        }
        if(cnt == 0) {
            str += "no features"
        }
        else {
            features = features.join(", ")
            features = features.replace(/, ([^,]*)$/, ' and $1')
            str += features
        }
        document.getElementById("output-text").innerHTML = str
    }
}
