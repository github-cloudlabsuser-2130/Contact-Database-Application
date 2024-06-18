const UserController = require('../Controllers/UserController');

describe('UserController', () => {
  let userController;

  beforeEach(() => {
    userController = new UserController();
  });

  describe('Index', () => {
    it('should return the user list', () => {
      const userList = userController.Index();
      expect(userList).toBeDefined();
      expect(Array.isArray(userList)).toBe(true);
    });
  });

  describe('Details', () => {
    it('should return the user with the specified id', () => {
      const id = 1;
      const user = userController.Details(id);
      expect(user).toBeDefined();
      expect(user.Id).toBe(id);
    });

    it('should return undefined if the user with the specified id does not exist', () => {
      const id = 999;
      const user = userController.Details(id);
      expect(user).toBeUndefined();
    });
  });

  describe('Create', () => {
    it('should add a new user to the user list', () => {
      const user = {
        Id: 1,
        Name: 'John Doe',
        Email: 'john.doe@example.com'
      };
      userController.Create(user);
      const userList = userController.Index();
      expect(userList).toContain(user);
    });
  });

  describe('Edit', () => {
    it('should update the user with the specified id', () => {
      const id = 1;
      const updatedUser = {
        Id: id,
        Name: 'Updated Name',
        Email: 'updated.email@example.com'
      };
      userController.Edit(id, updatedUser);
      const user = userController.Details(id);
      expect(user).toEqual(updatedUser);
    });

    it('should return undefined if the user with the specified id does not exist', () => {
      const id = 999;
      const updatedUser = {
        Id: id,
        Name: 'Updated Name',
        Email: 'updated.email@example.com'
      };
      const user = userController.Edit(id, updatedUser);
      expect(user).toBeUndefined();
    });
  });

  describe('Delete', () => {
    it('should remove the user with the specified id from the user list', () => {
      const id = 1;
      userController.Delete(id);
      const userList = userController.Index();
      const deletedUser = userList.find(user => user.Id === id);
      expect(deletedUser).toBeUndefined();
    });

    it('should return undefined if the user with the specified id does not exist', () => {
      const id = 999;
      const user = userController.Delete(id);
      expect(user).toBeUndefined();
    });
  });
});
