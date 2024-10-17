import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFarm } from '../../redux/farmSlice';
import { Farm } from '../../Models/Farm';
import axios from 'axios';
import {
  Container,
  Title,
  Form,
  Input,
  Label,
  Button,
  Message,
} from './FarmPage.styles';
import { validateCPF, validateCNPJ } from '../../utils/validators';

const cropsOptions = ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açúcar'];

const FarmPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [farmData, setFarmData] = useState<Farm>({
    cpfCnpj: '',
    farmerName: '',
    farmName: '',
    city: '',
    state: '',
    totalArea: 0,
    arableArea: 0,
    vegetationArea: 0,
    crops: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFarmData({
      ...farmData,
      [name]: name.includes('Area') ? +value : value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleCropChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFarmData((prevData) =>
      prevData.crops.includes(value)
        ? {
            ...prevData,
            crops: prevData.crops.filter((crop) => crop !== value),
          }
        : { ...prevData, crops: [...prevData.crops, value] }
    );
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const cpfCnpj = farmData.cpfCnpj.replace(/\D/g, '');

    if (!cpfCnpj) {
      newErrors.cpfCnpj = 'CPF/CNPJ é obrigatório.';
    } else if (cpfCnpj.length === 11 && !validateCPF(cpfCnpj)) {
      newErrors.cpfCnpj = 'CPF inválido.';
    } else if (cpfCnpj.length === 14 && !validateCNPJ(cpfCnpj)) {
      newErrors.cpfCnpj = 'CNPJ inválido.';
    } else if (cpfCnpj.length !== 11 && cpfCnpj.length !== 14) {
      newErrors.cpfCnpj = 'O CPF deve ter 11 dígitos e o CNPJ, 14.';
    }

    if (!farmData.farmerName)
      newErrors.farmerName = 'Nome do produtor é obrigatório.';
    if (!farmData.farmName)
      newErrors.farmName = 'Nome da fazenda é obrigatório.';
    if (!farmData.state) newErrors.state = 'Estado é obrigatório.';
    if (!farmData.city) newErrors.city = 'Cidade é obrigatória.';
    if (farmData.totalArea <= 0)
      newErrors.totalArea = 'Área total deve ser maior que 0.';
    if (farmData.arableArea < 0)
      newErrors.arableArea = 'Área arável não pode ser negativa.';
    if (farmData.vegetationArea < 0)
      newErrors.vegetationArea = 'Área de vegetação não pode ser negativa.';

    const totalArableAndVegetation =
      farmData.arableArea + farmData.vegetationArea;
    if (totalArableAndVegetation > farmData.totalArea) {
      newErrors.totalArea =
        'A soma da área arável e da área de vegetação não pode ser maior que a área total.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        'http://localhost:5000/farms',
        farmData
      );
      dispatch(addFarm(response.data));
      setFarmData({
        cpfCnpj: '',
        farmerName: '',
        farmName: '',
        city: '',
        state: '',
        totalArea: 0,
        arableArea: 0,
        vegetationArea: 0,
        crops: [],
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao adicionar a fazenda:', error);
    }
  };

  return (
    <Container>
      <Title>Cadastrar Fazenda</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
          <Input
            type="text"
            id="cpfCnpj"
            name="cpfCnpj"
            value={farmData.cpfCnpj}
            onChange={handleInputChange}
            placeholder="Digite o CPF ou CNPJ"
          />
          {errors.cpfCnpj && <Message>{errors.cpfCnpj}</Message>}
        </div>
        <div>
          <Label htmlFor="farmerName">Nome do Produtor</Label>
          <Input
            type="text"
            id="farmerName"
            name="farmerName"
            value={farmData.farmerName}
            onChange={handleInputChange}
            placeholder="Digite o nome do produtor"
          />
          {errors.farmerName && <Message>{errors.farmerName}</Message>}
        </div>
        <div>
          <Label htmlFor="farmName">Nome da Fazenda</Label>
          <Input
            type="text"
            id="farmName"
            name="farmName"
            value={farmData.farmName}
            onChange={handleInputChange}
            placeholder="Digite o nome da fazenda"
          />
          {errors.farmName && <Message>{errors.farmName}</Message>}
        </div>
        <div>
          <Label htmlFor="state">Estado</Label>
          <Input
            type="text"
            id="state"
            name="state"
            value={farmData.state}
            onChange={handleInputChange}
            placeholder="Digite o estado"
          />
          {errors.state && <Message>{errors.state}</Message>}
        </div>
        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={farmData.city}
            onChange={handleInputChange}
            placeholder="Digite a cidade"
          />
          {errors.city && <Message>{errors.city}</Message>}
        </div>
        <div>
          <Label htmlFor="totalArea">Área Total (ha)</Label>
          <Input
            type="number"
            id="totalArea"
            name="totalArea"
            value={farmData.totalArea}
            onChange={handleInputChange}
            placeholder="Digite a área total em hectares"
          />
          {errors.totalArea && <Message>{errors.totalArea}</Message>}
        </div>
        <div>
          <Label htmlFor="arableArea">Área Arável (ha)</Label>
          <Input
            type="number"
            id="arableArea"
            name="arableArea"
            value={farmData.arableArea}
            onChange={handleInputChange}
            placeholder="Digite a área arável em hectares"
          />
          {errors.arableArea && <Message>{errors.arableArea}</Message>}
        </div>
        <div>
          <Label htmlFor="vegetationArea">Área de Vegetação (ha)</Label>
          <Input
            type="number"
            id="vegetationArea"
            name="vegetationArea"
            value={farmData.vegetationArea}
            onChange={handleInputChange}
            placeholder="Digite a área de vegetação em hectares"
          />
          {errors.vegetationArea && <Message>{errors.vegetationArea}</Message>}
        </div>
        <div>
          <Label>Culturas Plantadas:</Label>
          {cropsOptions.map((crop) => (
            <div key={crop}>
              <input
                type="checkbox"
                value={crop}
                checked={farmData.crops.includes(crop)}
                onChange={handleCropChange}
              />
              {crop}
            </div>
          ))}
        </div>
        <Button type="submit">Cadastrar Fazenda</Button>
      </Form>
    </Container>
  );
};

export default FarmPage;
