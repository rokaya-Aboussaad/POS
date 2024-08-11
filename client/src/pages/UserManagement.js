import React, { useState } from 'react';
import { Table, Button, Input, Checkbox, Upload, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DefaultLayout from '../components/DefaultLayout';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { code: 1, login: 'Administrateur', nom: 'Administrateur', prenom: 'Administrateur', administrateur: true, local: true },
    { code: 5, login: 'Osama', nom: 'Osama', prenom: 'Osama', administrateur: true, local: false },
    { code: 6, login: 'Samira', nom: 'Samira', prenom: 'Samira', administrateur: false, local: false },
    { code: 7, login: 'Souad', nom: 'Souad', prenom: 'Souad', administrateur: false, local: false },
    { code: 8, login: 'Aicha', nom: 'Aicha', prenom: 'Aicha', administrateur: false, local: false },
    { code: 9, login: 'Hicham', nom: 'Hicham', prenom: 'Hicham', administrateur: false, local: false },
  ]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = e => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddUser = () => {
    // Ajouter la logique pour ajouter un nouvel utilisateur
    const newUser = {
      code: users.length + 1,
      login: '',
      nom: '',
      prenom: '',
      administrateur: false,
      local: false,
    };
    setUsers([...users, newUser]);
  };

  const columns = [
    { title: 'Code', dataIndex: 'code', key: 'code' },
    { title: 'Login', dataIndex: 'login', key: 'login' },
    { title: 'Nom', dataIndex: 'nom', key: 'nom' },
    { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
    {
      title: 'Administrateur',
      dataIndex: 'administrateur',
      key: 'administrateur',
      render: (admin, record) => (
        <Checkbox
          checked={admin}
          onChange={() => handleCheckboxChange(record.code, 'administrateur')}
        />
      ),
    },
    {
      title: 'Local',
      dataIndex: 'local',
      key: 'local',
      render: (local, record) => (
        <Checkbox
          checked={local}
          onChange={() => handleCheckboxChange(record.code, 'local')}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditUser(record.code)}>Modifier</Button>
          <Button type="danger" onClick={() => handleDeleteUser(record.code)}>Supprimer</Button>
        </Space>
      ),
    },
  ];

  const handleCheckboxChange = (code, field) => {
    const updatedUsers = users.map(user => {
      if (user.code === code) {
        return { ...user, [field]: !user[field] };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleEditUser = (code) => {
    // Ajouter la logique pour modifier un utilisateur
    console.log('Modifier utilisateur avec le code:', code);
  };

  const handleDeleteUser = (code) => {
    // Ajouter la logique pour supprimer un utilisateur
    const updatedUsers = users.filter(user => user.code !== code);
    setUsers(updatedUsers);
  };

  return (
    <DefaultLayout>
      <div className="user-form">
        {/* Ajoutez ici les champs et les contrôles pour ajouter/modifier des utilisateurs */}
        <Input placeholder="Code" />
        <Input placeholder="Nom" />
        <Input placeholder="Prénom" />
        <Input placeholder="Login" />
        <Input.Password placeholder="Ancien mot de passe" />
        <Input.Password placeholder="Nouveau mot de passe" />
        <Input.Password placeholder="Confirmer mot de passe" />
        <Checkbox>Active</Checkbox>
        <Checkbox>Administrateur</Checkbox>
        <Checkbox>Local</Checkbox>
        <Upload beforeUpload={() => false} onChange={handleImageUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Importer</Button>
        </Upload>
        {selectedImage && <img src={selectedImage} alt="selected" style={{ width: '100px', marginTop: '10px' }} />}
      </div>
      <Button type="primary" onClick={handleAddUser} style={{ marginBottom: '10px' }}>Ajouter Utilisateur</Button>
      <Table dataSource={users} columns={columns} rowKey="code" />
    </DefaultLayout>
  );
};

export default UserManagement;
