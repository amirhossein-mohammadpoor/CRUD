let i
phonebookTable = () => {
  const phonebook = JSON.parse(localStorage.getItem("phonebook"))
  const bgColor = [
    "bg-primary",
    "bg-success",
    "bg-warning",
    "bg-danger",
    "bg-info"
  ]
  for (i = 0; i < phonebook.length; i++) {
    $("tbody").append(
      $(`
        <tr class='${bgColor[(i/2)%4]}'>
          <td class='align-middle'>${i + 1}</td>
          <td class='align-middle'>${phonebook[i].name}</td>
          <td class='align-middle'>${phonebook[i].subname}</td>
          <td class='align-middle'>${phonebook[i].email}</td>
          <td class='align-middle'>${phonebook[i].phone}</td>
          <td class='align-middle'>${phonebook[i].address}</td>
          <td>
            <button class='btn btn-light mr-3' data-toggle='modal' data-target='#editModal' onclick='edit(this)'>
              <i class='fa fa-edit'></i>
            </button>
            <button class='btn btn-secondary' onclick='remove(this)'>
              <i class='fa fa-trash'></i>
            </button>
          </td>
        </tr>
      `)
    )
  }
}

$("document").ready(function () {
  if (!localStorage.getItem("phonebook"))
    localStorage.setItem("phonebook", JSON.stringify([]))
  else
  phonebookTable()
})

$("#signPhoneNumber").on("click", function () {
  const inputs = $("form").first().serializeArray()
  if (!signInputValidation(inputs))
    return
  $("#signModal").modal("hide")
  const phonebook = JSON.parse(localStorage.getItem("phonebook"))
  phonebook.push({
    name: inputs[0].value.trim(),
    subname: inputs[1].value.trim(),
    email: inputs[2].value.trim(),
    phone: inputs[3].value.trim(),
    address: inputs[4].value.trim()
  })
  localStorage.setItem("phonebook", JSON.stringify(phonebook))
  const bgColor = [
    "bg-primary",
    "bg-success",
    "bg-warning",
    "bg-danger",
    "bg-info"
  ]
  $("tbody").append(
    $(`
      <tr class='${bgColor[(i/2)%4]}'>
        <td>${phonebook.length}</td>
        <td>${inputs[0].value}</td>
        <td>${inputs[1].value}</td>
        <td>${inputs[2].value}</td>
        <td>${inputs[3].value}</td>
        <td>${inputs[4].value}</td>
        <td>
          <button class='btn btn-light mr-3' data-toggle='modal' data-target='#editModal' onclick='edit(this)'>
            <i class='fa fa-edit'></i>
          </button>
          <button class='btn btn-secondary' onclick='remove(this)'>
            <i class='fa fa-trash'></i>
          </button>
        </td>
      </tr>
    `)
  )
  i++
})

remove = elemObj => {
  const phonebook = JSON.parse(localStorage.getItem("phonebook"))
  phonebook.splice(
    $(elemObj).closest("tr").find("td").first().text() - 1,
    1
  )
  localStorage.setItem("phonebook", JSON.stringify(phonebook))
  $("tbody").empty()
  phonebookTable()
}

$("#editPhoneNumber").on("click", function () {
  const inputs = $("form").last().serializeArray()
  if (!editInputValidation(inputs))
    return
  $("#editModal").modal("hide")
  const phonebook = JSON.parse(localStorage.getItem("phonebook"))
  phonebook.splice(
    $(editElemObj).closest("tr").find("td").first().text() - 1,
    1,
    {
      name: $(editElemObj).closest("tr").find("td").eq(1).text(),
      subname: $(editElemObj).closest("tr").find("td").eq(2).text(),
      email: inputs[0].value.trim(),
      phone: inputs[1].value.trim(),
      address: inputs[2].value.trim()
    }
  )
  localStorage.setItem("phonebook", JSON.stringify(phonebook))
  $("tbody").empty()
  phonebookTable()
})

let editElemObj 
edit = elemObj => {
  editElemObj = elemObj
  $("form").last().find("input").eq(0).val(
    $(editElemObj).closest("tr").find("td").eq(3).text()
  )
  $("form").last().find("input").eq(1).val(
    $(editElemObj).closest("tr").find("td").eq(4).text()
  )
  $("form").last().find("input").eq(2).val(
    $(editElemObj).closest("tr").find("td").eq(5).text()
  )
}

signInputValidation = inputs => {
  let flag = true
  let errorMessage
  if (!/^\w+$/.test(inputs[0].value)) {
    errorMessage += "invalid name\n"
    flag = false
  }
  if (!/^\w+$/.test(inputs[1].value)) {
    errorMessage += "invalid subname\n"
    flag = false
  }
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputs[2].value)) {
    errorMessage += "invalid email\n"
    flag = false
  }
  if (!/^\d+$/.test(inputs[3].value)) {
    errorMessage += "invalid phone number\n"
    flag = false
  }
  if(!inputs[4].value.trim()) {
    errorMessage += "invalid address"
    flag = false
  }
  if (!flag)
    alert(errorMessage)
  return flag
}

editInputValidation = inputs => {
  let flag = true
  let errorMessage
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputs[0].value)) {
    errorMessage += "invalid email\n"
    flag = false
  }
  if (!/^\d+$/.test(inputs[1].value)) {
    errorMessage += "invalid phone number\n"
    flag = false
  }
  if (!inputs[2].value.trim()) {
    errorMessage += "invalid address"
    flag = false
  }
  if (!flag)
    alert(errorMessage)
  return flag
}