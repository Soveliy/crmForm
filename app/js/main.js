'use strict'
const addButton = document.querySelector('[data-add-role]')
const role =  document.querySelector('[data-role]')
const roleContainer = document.querySelector('[data-role-container]')

function createRole(){
  let newRole = role.cloneNode(true)
  addButton.before(newRole)
}
addButton.addEventListener('click', function (event) {
  createRole()
})


roleContainer.onclick = function(event) {
  if (event.target.className != 'crmForm-item__input-remove') return;
    let roleItem = event.target.closest('[data-role]');
    roleItem.remove();
};