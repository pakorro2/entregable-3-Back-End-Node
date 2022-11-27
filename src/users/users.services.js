const usersController = require('./users.controllers')

const getAllUsers = (req, res) => {
  usersController.findAllUsers()
    .then(data => res.json(data))
    .catch(err => {
      res.status(400).json({ message: err.message });
    })

}

const getUserById = (req, res) => {
  const id = req.params.id
  usersController.findUserById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({ message: 'Invaled ID, User not found' })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    })

}

const postUser = (req, res) => {
  const { first_name, last_name, email, password, birthday } = req.body
  usersController.createUser({ first_name, last_name, email, password, birthday })
    .then(data => res.status(201).json(data))
    .catch(err => res.status(400).json({ message: err.message }))
}

const patchUser = (req, res) => {
  const id = req.params.id
  const { first_name, last_name, email, password, birthday } = req.body
  usersController.updateUser(id, { first_name, last_name, email, password, birthday })
    .then(data => {
      if (data) {
        res.status(200).json({
          message: 'User update succesfully whit id ' + id
        })
      } else {
        res.status(404).json({ message: 'Invalid User ID,update failed' })
      }
    })
    .catch(err => res.status(400).json({ message: err.message }))
}

const deleteUser = (req, res) => {
  const id = req.params.id
  usersController.deleteUser(id)
    .then(data => {
      if (data) {
        res.status(204).json({ message: 'User delete succesfully' })
      } else {
        res.status(404).json({ message: 'Invalid User ID,delete failed' })
      }
    })
    .catch(err => res.status(400).json({ message: err.message }))
}

module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  patchUser,
  deleteUser
}