package db

import (
	"fmt"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB = nil

func DB() *gorm.DB {
	if db == nil {
		var err error
		if db, err = gorm.Open(sqlite.Open("contacts.sqlite"), &gorm.Config{}); err != nil {
			panic(err)
		} else {
			return db
		}
	} else {
		return db
	}
}

type User struct {
	Id        uint      `json:"id" grom:"primaryKey"`
	Username  string    `json:"name"`
	Password  string    `json:"password"`
	Contacts  []Contact `json:"contacts" gorm:"foreignKey:UserId"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Contact struct {
	Id        uint      `json:"id" grom:"primaryKey"`
	FirstName string    `json:"first_name"`
	LastName  *string   `json:"last_name,omitempty"`
	Mobile    *string   `json:"mobile,omitempty"`
	Address   *string   `json:"address,omitempty"`
	UserId    uint      `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
type UpdateContact struct {
	FirstName *string `json:"first_name"`
	LastName  *string `json:"last_name"`
	Mobile    *string `json:"mobile"`
	Address   *string `json:"address"`
}
type CreateContact struct {
	FirstName string  `json:"first_name"`
	LastName  *string `json:"last_name"`
	Mobile    *string `json:"mobile"`
	Address   *string `json:"address"`
}

func (contact UpdateContact) Validate() error {
	if contact.FirstName == nil && contact.LastName == nil && contact.Mobile == nil && contact.Address == nil {
		return fmt.Errorf("atleast one field must be upodated")
	}
	return nil
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&User{}, &Contact{})
}
func (user *User) Create(db *gorm.DB) error {
	var existing User
	if e := db.Model(user).First(&existing, "username = ?", user.Username).Error; e == nil {
		return fmt.Errorf("user already exists")
	} else {
		return db.Create(user).Error
	}
}
func (user *User) GetContacts(db *gorm.DB, search string) ([]Contact, error) {
	clause := "%"
	if search != "" {
		clause = "%" + search + "%"
	}
	if e := db.Preload("Contacts", "first_name like ? OR last_name like ? OR mobile like ? OR address like ?", clause, clause, clause, clause).First(user).Error; e == nil {
		return user.Contacts, nil
	} else {
		return nil, e
	}
}
func (user *User) CreateContact(db *gorm.DB, createData CreateContact) (*Contact, error) {
	contact := &Contact{
		FirstName: createData.FirstName,
		LastName:  createData.LastName,
		Mobile:    createData.Mobile,
		Address:   createData.Address,
		UserId:    user.Id,
	}
	if e := contact.Create(db); e == nil {
		return contact, nil
	} else {
		return nil, e
	}
}
func (user *User) DeleteContact(db *gorm.DB, id uint) error {
	return db.Model(&Contact{}).Delete(&Contact{Id: id}, "user_id = ? ", user.Id).Error
}
func (user *User) UpdateContact(dbb *gorm.DB, id uint, contactBody UpdateContact) (*Contact, error) {
	var contact *Contact = &Contact{Id: id}
	if e := dbb.Transaction(func(db *gorm.DB) error {
		if e := db.Model(&Contact{Id: id}).Where("user_id = ?", user.Id).UpdateColumns(contactBody).Error; e == nil {
			if e := db.First(contact, "id = ?", id).Error; e == nil {
				if contact.UserId == user.Id {
					return nil
				} else {
					return fmt.Errorf("not found")
				}
			} else {
				return e
			}
		} else {
			return e
		}
	}); e == nil {
		return contact, nil
	} else {
		return nil, e
	}

}
func (user *User) Login(db *gorm.DB) error {
	if e := db.Model(user).First(user, "username = ? AND password = ?", user.Username, user.Password).Error; e != nil {
		return fmt.Errorf("invalid credentials")
	} else {
		return nil
	}
}
func (contact *Contact) Create(db *gorm.DB) error {
	return db.Create(contact).Error
}
