import { BACKEND_PORT } from './config.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';

let authToken = null
let userId = null
let watcheeUserIds = []
let jobId = null

// Click follower list item to jump to other's profile
document.getElementById('flr_list').addEventListener('click', (e) => {
    document.getElementById('feed').style.display = "none"
    document.getElementById('search_block').style.display = "none"
    document.getElementById('profile').style.display = "flex"
    getUserProfile(e.target.uid)
})

// register
document.getElementById('btn_reg').addEventListener('click', () => {
    const email = document.getElementById('reg_email').value
    const name = document.getElementById('reg_name').value
    const password = document.getElementById('reg_pwd').value
    const cpwd = document.getElementById('reg_cpwd').value

    if (password !== cpwd) {
        document.getElementById('reg_pwd_popup').style.display = 'flex'
        return
    }

    const url = 'http://localhost:5005/auth/register'
    const body = {
        email,
        password,
        name
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken
        },
        body: JSON.stringify(body)
    }
    fetch(url, options).then(res => res.json()).then(json => {
        if (json.error != undefined) {
            document.getElementById('popup_content').innerHTML = json.error
            document.getElementById('login_popup').style.display = 'flex'
            return
        }
        authToken = json.token
        userId = json.userId
    })
})

// login
document.getElementById('sign_up').addEventListener('click', () => {
    const email = document.getElementById('login_email').value
    const password = document.getElementById('login_password').value
    const url = 'http://localhost:5005/auth/login'
    const body = {
        email,
        password,
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken
        },
        body: JSON.stringify(body)
    }
    fetch(url, options).then(res => res.json()).then(json => {
        if (json.error != undefined) {
            document.getElementById('popup_content').innerHTML = json.error
            document.getElementById('login_popup').style.display = 'flex'
        }
        else {
            authToken = json.token
            userId = json.userId
            document.getElementById('feed').style.display = 'flex'
            document.getElementById('search_block').style.display = 'flex'
            document.getElementById('login').style.display = "none";
            showFeed()
        }
    })
})

// load Feed data to profile page
function showFeed() {
    for (var i = 0; i <= 100; i += 5) {
        let url = "http://localhost:5005/job/feed?start="
        url += i
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            },
            body: undefined
        }
        fetch(url, options).then(res => res.json()).then(json => {
            if (json.error != undefined) {
                document.getElementById('popup_content').innerHTML = json.error
                document.getElementById('login_popup').style.display = 'flex'
                return
            }
            else {
                for (var j in json) {
                    createNewJobDiv(json[j])
                }
            }
        })
    }
}

// load user's feed data to profile page
function showMyFeed(user_id) {
    document.getElementById('user_feed').innerHTML = ''
    for (var i = 0; i <= 100; i += 5) {
        let url = "http://localhost:5005/job/feed?start="
        url += i
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            },
            body: undefined
        }
        fetch(url, options).then(res => res.json()).then(json => {
            if (json.error != undefined) {
                document.getElementById('popup_content').innerHTML = json.error
                document.getElementById('login_popup').style.display = 'flex'
                return
            }
            else {
                for (var j in json) {
                    if (user_id == json[j].creatorId) {
                        createMyNewJobDiv(json[j])
                    }
                }
            }
        })
    }
}

// Dynamically create a div for each job
// ---- For Feed page ----
function createNewJobDiv(json) {
    const id = json.id
    let feed_block = document.createElement('div')
    let creator = document.createElement('div')
    let avatar = document.createElement('img')
    let job_title = document.createElement('div')
    let time_all = document.createElement('div')
    let job_img = document.createElement('img')
    let desc = document.createElement('div')
    let like_comment = document.createElement('div')

    // let delete_btn = document.createElement('button')
    feed_block.appendChild(creator)
    feed_block.appendChild(avatar)
    feed_block.appendChild(job_title)
    feed_block.appendChild(time_all)
    feed_block.appendChild(job_img)
    feed_block.appendChild(desc)
    feed_block.appendChild(like_comment)
    // feed_block.appendChild(delete_btn)
    let create_time = document.createElement('p')
    let start_time = document.createElement('p')
    time_all.appendChild(create_time)
    time_all.appendChild(start_time)
    let like = document.createElement('button')
    let comment_div = document.createElement('div')
    let comment_input = document.createElement('input')
    let comment_btn = document.createElement('button')
    let comment = document.createElement('div')
    let like_list_a = document.createElement('a')
    let like_list = document.createElement('div')
    like_comment.appendChild(like)
    like_comment.appendChild(comment_div)
    comment_div.appendChild(comment_input)
    comment_div.appendChild(comment_btn)
    feed_block.appendChild(like_list_a)
    feed_block.appendChild(like_list)
    feed_block.appendChild(comment)
    comment_btn.innerHTML = 'submit'
    like_list_a.innerHTML = 'show like list'


    if (window.matchMedia("(max-width: 576px)").matches) {
        comment_btn.style.border = 'none'
        comment_btn.style.backgroundColor = '#44BCF2'
        comment_btn.style.color = 'azure'
        comment_btn.style.borderRadius = '5px'
        comment_input.style.width = '80px';
        like.innerHTML = 'Like'

        feed_block.style.display = "flex"
        feed_block.style.flexDirection = "column"
        feed_block.style.padding = "10px"
        feed_block.style.borderRadius = "20px";
        feed_block.style.border = "none";
        feed_block.style.width = "300px";
        feed_block.style.borderColor = "black";
        feed_block.style.marginTop = "20px";
        feed_block.style.backgroundColor = '#ffffff'
        feed_block.style.margin = '10px auto';

        avatar.style.width = "100px"
        avatar.style.height = "100px"
        time_all.style.marginTop = "10px";
        job_img.style.width = "180px"
        job_img.style.height = "130px"
        job_img.style.marginLeft = "25%";
        desc.style.margin = "5px 0 5px 0";
        like_comment.style.display = "flex";
        like_comment.style.flexDirection = "row";
        like_comment.style.justifyContent = "space-between";
        comment.innerHTML = '<strong>Comments: <br /></strong>'
        comment.style.fontSize = '16px'
        comment.style.border = 'none'
        comment.style.borderRadius = '20px'
        comment.style.backgroundColor = '#eeeeee'
        comment.style.paddingTop = '4px'
        comment.style.paddingLeft = '10px'
        comment.style.marginTop = '6px'
        like_list.style.fontSize = '16px'
        like_list.style.border = 'none'
        like_list.style.borderRadius = '20px'
        like_list.style.backgroundColor = '#eeeeee'
        like_list.style.paddingTop = '4px'
        like_list.style.paddingLeft = '10px'
        like_list.style.marginTop = '6px'
        like_list.style.display = 'none'
        like_list_a.style.color = 'blue'
        like_list_a.innerHTML = 'show like list'
    } else if (window.matchMedia("(max-width: 768px)").matches) {
        comment_btn.style.border = 'none'
        comment_btn.style.backgroundColor = '#44BCF2'
        comment_btn.style.color = 'azure'
        comment_btn.style.borderRadius = '5px'
        comment_input.style.width = '130px';
        like.innerHTML = 'Like'

        feed_block.style.display = "flex"
        feed_block.style.flexDirection = "column"
        feed_block.style.padding = "10px"
        feed_block.style.borderRadius = "20px";
        feed_block.style.border = "none";
        feed_block.style.width = "500px";   
        feed_block.style.borderColor = "black";
        feed_block.style.marginTop = "20px";
        feed_block.style.backgroundColor = '#ffffff'
        feed_block.style.margin = '10px auto';

        avatar.style.width = "100px"
        avatar.style.height = "100px"
        time_all.style.marginTop = "10px";
        job_img.style.width = "300px"
        job_img.style.height = "210px"
        job_img.style.marginLeft = "25%";
        desc.style.margin = "5px 0 5px 0";
        like_comment.style.display = "flex";
        like_comment.style.flexDirection = "row";
        like_comment.style.justifyContent = "space-between";
        comment.innerHTML = '<strong>Comments: <br /></strong>'
        comment.style.fontSize = '16px'
        comment.style.border = 'none'
        comment.style.borderRadius = '20px'
        comment.style.backgroundColor = '#eeeeee'
        comment.style.paddingTop = '4px'
        comment.style.paddingLeft = '10px'
        comment.style.marginTop = '6px'
        like_list.style.fontSize = '16px'
        like_list.style.border = 'none'
        like_list.style.borderRadius = '20px'
        like_list.style.backgroundColor = '#eeeeee'
        like_list.style.paddingTop = '4px'
        like_list.style.paddingLeft = '10px'
        like_list.style.marginTop = '6px'
        like_list.style.display = 'none'
        like_list_a.style.color = 'blue'
        like_list_a.innerHTML = 'show like list'
    } else {
        comment_btn.style.border = 'none'
        comment_btn.style.backgroundColor = '#44BCF2'
        comment_btn.style.color = 'azure'
        comment_btn.style.borderRadius = '5px'
        comment_input.style.width = '250px';
        like.innerHTML = 'Like'

        feed_block.style.display = "flex"
        feed_block.style.flexDirection = "column"
        feed_block.style.padding = "10px"
        feed_block.style.borderRadius = "20px";
        feed_block.style.border = "none";
        feed_block.style.width = "80%";
        feed_block.style.borderColor = "black";
        feed_block.style.marginTop = "20px";
        feed_block.style.backgroundColor = '#ffffff'
        feed_block.style.margin = '10px auto';

        avatar.style.width = "100px"
        avatar.style.height = "100px"
        time_all.style.marginTop = "10px";
        job_img.style.width = "40%"
        job_img.style.height = "40%"
        job_img.style.marginLeft = "25%";
        desc.style.margin = "5px 0 5px 0";
        like_comment.style.display = "flex";
        like_comment.style.flexDirection = "row";
        like_comment.style.justifyContent = "space-between";
        comment.innerHTML = '<strong>Comments: <br /></strong>'
        comment.style.fontSize = '16px'
        comment.style.border = 'none'
        comment.style.borderRadius = '20px'
        comment.style.backgroundColor = '#eeeeee'
        comment.style.paddingTop = '4px'
        comment.style.paddingLeft = '10px'
        comment.style.marginTop = '6px'
        like_list.style.fontSize = '16px'
        like_list.style.border = 'none'
        like_list.style.borderRadius = '20px'
        like_list.style.backgroundColor = '#eeeeee'
        like_list.style.paddingTop = '4px'
        like_list.style.paddingLeft = '10px'
        like_list.style.marginTop = '6px'
        like_list.style.flexDirection = 'column'
        like_list.style.display = 'none'
        like_list_a.style.color = 'blue'
        like_list_a.innerHTML = 'show like list'
    }

    like_list_a.addEventListener('click', () => {
        if(like_list_a.innerHTML == 'show like list') {
            like_list_a.innerHTML = 'close'
            like_list.style.display = 'flex'
        }
        else {
            like_list_a.innerHTML = 'show like list'
            like_list.style.display = 'none'
        }
    })

    for(var i in json.likes) {
        let like_item = document.createElement('a')
        like_item.innerHTML = json.likes[i].userName
        like_item.uid = json.likes[i].userId
        like_list.appendChild(like_item)
    }

    like_list.addEventListener('click', (e) => {
        document.getElementById('feed').style.display = "none"
        document.getElementById('search_block').style.display = "none"
        document.getElementById('profile').style.display = "flex"
        getUserProfile(e.target.uid)
    })
    
    for (var i in json.comments) {
        let comment_name = document.createElement('a')
        let comment_text = document.createElement('p')
        comment_name.style.paddingLeft = "20px"
        comment_text.style.paddingLeft = "20px"
        comment_name.style.fontSize = '10px'
        comment_text.style.fontSize = '10px'
        comment_name.style.color = '#666666'
        comment_text.style.color = '#666666'
        comment.appendChild(comment_name)
        comment.appendChild(comment_text)
        comment_name.innerHTML = 'Username: ' + json.comments[i].userName
        comment_text.innerHTML = 'Comment: ' + json.comments[i].comment
        comment_name.uid = json.comments[i].userId
    }

    comment.addEventListener('click', (e) => {
        document.getElementById('feed').style.display = "none"
        document.getElementById('search_block').style.display = "none"
        document.getElementById('profile').style.display = "flex"
        getUserProfile(e.target.uid)
    })
    

    // Judging like or unlike
    let flag = false
    for (var i in json.likes) {
        if (json.likes[i].userId == userId) {
            flag = true
            break
        }
    }
    if (flag) {
        like.innerHTML = 'Unlike'
        like.style.backgroundColor = '#E43F4C'
        like.style.border = 'none'
        like.style.borderRadius = '20px'
        like.style.color = 'azure'
    }
    else {
        like.innerHTML = 'Like'
        like.style.backgroundColor = '#44BCF2'
        like.style.border = 'none'
        like.style.borderRadius = '20px'
        like.style.color = 'azure'
    }

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken
        },
        body: undefined
    }
    fetch(`http://localhost:5005/user?userId=${json.creatorId}`, options).then(res => res.json()).then(json => {
        if (json.error != undefined) {
            document.getElementById('popup_content').innerHTML = json.error
            document.getElementById('login_popup').style.display = 'flex'
        }
        else {
            creator.innerHTML = json.name
            avatar.src = json.image
        }
    })
    job_title.innerHTML = json.title
    create_time.innerHTML = 'Create Date: ' + json.createdAt
    start_time.innerHTML = 'Start Date' + json.start
    job_img.src = json.image
    desc.innerHTML = json.description

    // like or unlike
    like.addEventListener('click', () => {
        const url = "http://localhost:5005/job/like"
        if (like.innerHTML == 'Like') {
            like.innerHTML = 'UnLike'
            like.style.backgroundColor = '#E43F4C'
            like.style.border = 'none'
            like.style.borderRadius = '20px'
            like.style.color = 'azure'
            const body = {
                id,
                turnon: true
            }
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken
                },
                body: JSON.stringify(body)
            }
            fetch(url, options).then(res => res.json()).then(json => {
                if (json.error != undefined) {
                    alert(json.error)
                }
                else {
                    alert("success")
                }
            })
        }
        else {
            like.innerHTML = 'Like'
            like.style.backgroundColor = '#44BCF2'
            like.style.border = 'none'
            like.style.borderRadius = '20px'
            like.style.color = 'azure'
            const body = {
                id,
                turnon: false
            }
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken
                },
                body: JSON.stringify(body)
            }
            fetch(url, options).then(res => res.json()).then(json => {
                if (json.error != undefined) {
                    alert(json.error)
                }
                else {
                    alert("success")
                }
            })
        }
    })

    // add comment
    comment_btn.addEventListener('click', () => {
        const comment = comment_input.value
        const url = 'http://localhost:5005/job/comment'
        const body = {
            id,
            comment
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            },
            body: JSON.stringify(body)
        }
        fetch(url, options).then(res => res.json()).then(json => {
            if (json.error != undefined) {
                alert(json.error)
            }
            else {
                alert("success")
            }
        })
    })

    const body = document.getElementById('feed')
    body.appendChild(feed_block)
}

// Dynamically create a div for each job
// ---- For Profile page ----
function createMyNewJobDiv(json) {
    const id = json.id
    let feed_block = document.createElement('div')
    let creator = document.createElement('div')
    let avatar = document.createElement('img')
    let job_title = document.createElement('div')
    let time_all = document.createElement('div')
    let job_img = document.createElement('img')
    let desc = document.createElement('div')
    let like_comment = document.createElement('div')
    let delete_btn = document.createElement('button')
    let edit_btn = document.createElement('button')

    feed_block.appendChild(creator)
    feed_block.appendChild(avatar)
    feed_block.appendChild(job_title)
    feed_block.appendChild(time_all)
    feed_block.appendChild(job_img)
    feed_block.appendChild(desc)
    feed_block.appendChild(like_comment)
    feed_block.appendChild(delete_btn)
    feed_block.appendChild(edit_btn)
    let create_time = document.createElement('p')
    let start_time = document.createElement('p')
    time_all.appendChild(create_time)
    time_all.appendChild(start_time)
    let like_num = document.createElement('p')
    let comment_num = document.createElement('p')
    like_comment.appendChild(like_num)
    like_comment.appendChild(comment_num)

    feed_block.style.display = "flex"
    feed_block.style.flexDirection = "column"
    feed_block.style.padding = "10px"
    feed_block.style.borderRadius = "20px";
    feed_block.style.border = "none";
    feed_block.style.width = "100%";
    feed_block.style.borderColor = "black";
    feed_block.style.marginTop = "20px";
    feed_block.style.backgroundColor = "#ffffff";

    avatar.style.width = "100px"
    avatar.style.height = "100px"
    time_all.style.marginTop = "10px";
    job_img.style.width = "400px"
    job_img.style.height = "400px"
    desc.style.margin = "5px 0 5px 0";
    like_comment.style.display = "flex";
    like_comment.style.flexDirection = "row";
    like_comment.style.justifyContent = "space-between";
    edit_btn.setAttribute("data-bs-toggle", "modal");
    edit_btn.setAttribute("data-bs-target", "#myModal4");
    edit_btn.setAttribute("type", "button");
    edit_btn.setAttribute("class", "btn btn-primary");

    if (json.creatorId != userId) {
        delete_btn.style.display = "none"
        edit_btn.style.display = "none"
    }

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken
        },
        body: undefined
    }
    fetch(`http://localhost:5005/user?userId=${json.creatorId}`, options).then(res => res.json()).then(json => {
        if (json.error != undefined) {
            document.getElementById('popup_content').innerHTML = json.error
            document.getElementById('login_popup').style.display = 'flex'
        }
        else {
            creator.innerHTML = json.name
            avatar.src = json.image
        }
    })
    delete_btn.innerHTML = 'Delete'
    delete_btn.style.color = 'azure'
    delete_btn.style.backgroundColor = '#E43F4C'
    delete_btn.style.borderRadius = '15px'
    delete_btn.style.border = 'none'
    edit_btn.innerHTML = 'Edit'
    edit_btn.style.backgroundColor = '#44BCF2'
    edit_btn.style.marginTop = '5px'
    edit_btn.style.borderRadius = '15px'
    edit_btn.style.border = 'none'
    job_title.innerHTML = json.title
    create_time.innerHTML = json.createdAt
    start_time.innerHTML = json.start
    job_img.src = json.image
    desc.innerHTML = json.description
    like_num = countNum(json.likes)
    comment_num = countNum(json.comments)

    // delete job
    delete_btn.addEventListener('click', (e) => {
        feed_block.innerHTML = ''
        feed_block.style.cssText = "";
        ///////////////
        const url = 'http://localhost:5005/job'
        const body = {
            id
        }
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            },
            body: JSON.stringify(body)
        }
        fetch(url, options).then(res => res.json()).then(json => {
            if (json.error != undefined) {
                alert(json.error)
            }
            else {
                alert("success delete")
            }
        })
    })
    // edit job
    // the edit function is on line 904
    edit_btn.addEventListener('click', () => {
        jobId = id
    })

    const body = document.getElementById('user_feed')
    body.appendChild(feed_block)
}

// Calculate the length of the list
function countNum(list) {
    let cnt = 0
    for (var i in list) {
        cnt += 1
    }
    return cnt
}

document.getElementById('jump_register').addEventListener('click', () => {
    document.getElementById('register').style.display = "flex";
    document.getElementById('login').style.display = "none";
})

document.getElementById('jump_login').addEventListener('click', () => {
    document.getElementById('register').style.display = "none";
    document.getElementById('login').style.display = "flex";
})
document.getElementById('nav_profile').addEventListener('click', function (event) {
    event.stopPropagation();
    document.getElementById('feed').style.display = "none";
    document.getElementById('search_block').style.display = 'none'
    document.getElementById('profile').style.display = "flex";
    getUserProfile(userId)
})

document.getElementById('nav_feed').addEventListener('click', function (event) {
    event.stopPropagation();
    document.getElementById('feed').style.display = "flex";
    document.getElementById('search_block').style.display = 'flex'
    document.getElementById('profile').style.display = "none";
    getUserProfile(userId)
})

// Obtain user information
function getUserProfile(user_id) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken
        },
        body: undefined
    }
    fetch(`http://localhost:5005/user?userId=${user_id}`, options).then(res => res.json()).then(json => {
        if (json.error != undefined) {
            document.getElementById('popup_content').innerHTML = json.error
            document.getElementById('login_popup').style.display = 'flex'
        }
        else {
            document.getElementById('c_uid').innerHTML = json.id
            document.getElementById('c_email').innerHTML = json.email
            document.getElementById('c_name').innerHTML = json.name
            document.getElementById('c_img').src = json.image
            watcheeUserIds = json.watcheeUserIds
            if (userId != json.id) {
                document.getElementById('flr_btn').style.display = "flex"
                let flag = false
                for (var i in watcheeUserIds) {
                    if (watcheeUserIds[i] == userId) {
                        flag = true
                    }
                }
                if (flag) {
                    document.getElementById('flr_btn').innerHTML = 'Unfollow'
                }
                else {
                    document.getElementById('flr_btn').innerHTML = 'Follow'
                }
            }
            else {
                document.getElementById('flr_btn').style.display = "flex"
                MywatcheeUserIds = json.watcheeUserIds
            }
            showAllFollowers(watcheeUserIds)
        }
    })
    showMyFeed(user_id)
}

document.getElementById('c_btn').addEventListener('click', function (event) {
    event.stopPropagation()
    showAllFollowers(watcheeUserIds)
})

// Get the list of users who follow this user
function showAllFollowers(follower_list) {
    document.querySelector('#flr_list').innerHTML = ''
    let str = 'Followers: ' + countNum(follower_list)
    document.getElementById('c_btn').innerHTML = str
    for (const i in follower_list) {
        getNameByUserId(follower_list[i])
    }
}

// Get user name based on user id
const getNameByUserId = (user_id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken
        },
        body: undefined
    }
    fetch(`http://localhost:5005/user?userId=${user_id}`, options).then(res => res.json()).then(json => {
        if (json.error != undefined) {
            document.getElementById('popup_content').innerHTML = json.error
            document.getElementById('login_popup').style.display = 'flex'
        }
        else {
            const content = document.createElement('a')
            content.innerHTML = json.name
            content.uid = json.id
            document.getElementById('flr_list').appendChild(content)
            document.getElementById('flr_list').appendChild(document.createElement('br'))
            // content.addEventListener('click', function(event) {
            //     event.stopPropagation();
            //     document.getElementById('test').style.display="none"
            //     document.getElementById('profile').style.display="flex"
            //     getUserProfile(json.id)
            // })
        }
    })
}

// Follow function
document.getElementById('flr_btn').addEventListener('click', (e) => {
    let condition = document.getElementById('flr_btn').innerHTML
    let turnon = false
    if (condition == 'Unfollow') {
        turnon = false
        condition = document.getElementById('flr_btn').innerHTML = 'Follow'
    }
    else {
        turnon = true
        condition = document.getElementById('flr_btn').innerHTML = 'Unfollow'
    }
    let email = document.getElementById('c_email').innerHTML
    const url = 'http://127.0.0.1:5005/user/watch'
    const body = {
        email,
        turnon
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken
        },
        body: JSON.stringify(body)
    }
    fetch(url, options).then(res => res.json()).then(json => {
        if (json.error != undefined) {
            document.getElementById('popup_content').innerHTML = json.error
            document.getElementById('login_popup').style.display = 'flex'
            return
        }
    })
})

// edit user profile
document.getElementById('submit_profile_btn').addEventListener('click', () => {
    const email = document.getElementById('new_email').value
    const name = document.getElementById('new_name').value
    const password = document.getElementById('new_password').value
    var newfile = document.getElementById("new_img").files[0]
    const url = 'http://localhost:5005/user'
    function uploadFile(file) {
        return new Promise(function (resolve, reject) {
            let base64Pic = new FileReader();
            base64Pic.readAsDataURL(file)
            base64Pic.onload = function () {
                resolve(this.result)
            }
        })
    }

    uploadFile(newfile).then(function (result) {
        let image = result
        var body = {
            email,
            password,
            name,
            image
        }
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            },
            body: JSON.stringify(body)
        }
        fetch(url, options).then(res => res.json()).then(json => {
            if (json.error != undefined) {
                alert(json.error)
            } else {
                alert(json.error)
            }
        })
    })

})

// add job
document.getElementById('submit_newJob_btn').addEventListener('click', () => {
    const title = document.getElementById('new_title').value
    const start = document.getElementById('new_start_data').value
    const description = document.getElementById('new_des').value
    var newfile = document.getElementById("new_job_img").files[0]
    const url = 'http://localhost:5005/job'
    function uploadFile(file) {
        return new Promise(function (resolve, reject) {
            let base64Pic = new FileReader();
            base64Pic.readAsDataURL(file)
            base64Pic.onload = function () {
                // console.log(base64Pic.result);
                // let image = base64Pic.result
                resolve(this.result)
            }
        })
    }

    uploadFile(newfile).then(function (result) {
        let image = result
        var body = {
            title,
            image,
            start,
            description
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            },
            body: JSON.stringify(body)
        }
        fetch(url, options).then(res => res.json()).then(json => {
            if (json.error != undefined) {
                alert(json.error)

            } else {
                alert('Add new job success!')
            }
        })
    })
    document.getElementById('feed').innerHTML = ''
})


// Edit Job
document.getElementById('update_job_btn').addEventListener('click', (e) => {
    const id = jobId
    const title = document.getElementById('update_title').value
    const start = document.getElementById('update_start_data').value
    const description = document.getElementById('update_des').value
    var newfile = document.getElementById("update_job_img").files[0]
    // console.log(newfile)
    const url = 'http://localhost:5005/job'
    function uploadFile(file) {
        return new Promise(function (resolve, reject) {
            let base64Pic = new FileReader();
            base64Pic.readAsDataURL(file)
            base64Pic.onload = function () {
                // let image = base64Pic.result
                resolve(this.result)
            }
        })
    }

    uploadFile(newfile).then(function (result) {
        let image = result
        const body = {
            id,
            title,
            image,
            start,
            description
        }
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            },
            body: JSON.stringify(body)
        }
        fetch(url, options).then(res => res.json()).then(json => {
            if (json.error != undefined) {
                // console.log(json.error)
                alert("update error")
            } else {
                // console.log(json)
                alert("update success")
            }
        })
    })
})

// Follow users by searching for email
document.getElementById('search').onkeydown = function (e) {
    var theEvent = window.event || e
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode
    if (code == 13) {
        var email = document.getElementById('search').value
        const url = 'http://localhost:5005/user/watch'
        const body = {
            email,
            turnon: true
        }
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            },
            body: JSON.stringify(body)
        }
        fetch(url, options).then(res => res.json()).then(json => {
            if (json.error != undefined) {
                alert(json.error)
            } else {
                alert('Follow Success!')
            }
        })
    }
}