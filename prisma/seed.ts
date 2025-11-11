import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário padrão
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Administrador',
    },
  });

  console.log('User created:', user);

  // Criar alguns funcionários de exemplo
  const employeesData = [
    { name: 'João Silva', age: 30, role: 'Desenvolvedor' },
    { name: 'Maria Santos', age: 25, role: 'Designer' },
    { name: 'Pedro Oliveira', age: 35, role: 'Gerente' },
  ];

  const employees = [];
  for (const employeeData of employeesData) {
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        name: employeeData.name,
        deletedAt: null,
      },
    });

    if (!existingEmployee) {
      const employee = await prisma.employee.create({
        data: employeeData,
      });
      employees.push(employee);
    } else {
      employees.push(existingEmployee);
    }
  }

  console.log('Employees created:', employees);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

