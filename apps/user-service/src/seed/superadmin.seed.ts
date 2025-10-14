import prisma from '../config/prisma.service';
import * as bcrypt from 'bcrypt';

export async function seedSuperAdmin() {
  try {
    const adminEmail = process.env.SUPER_ADMIN_EMAIL || 'superadmin@system.com';
    const adminPhone = process.env.SUPER_ADMIN_PHONE || '+911234567890';
    const adminPassword = process.env.SUPER_ADMIN_PASSWORD || 'Super@123';

    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' },
    });

    if (existingAdmin) {
      console.log('Super Admin already exists:', existingAdmin.email);
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const superAdmin = await prisma.user.create({
      data: {
        name: 'System Super Admin',
        email: adminEmail,
        phone: adminPhone,
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        isVerified: true,
        createdBy: 'system',
        updatedBy: 'system',
      },
    });

    console.log('Super Admin created successfully:', superAdmin.email);
  } catch (error) {
    console.error('Error creating Super Admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedSuperAdmin();
}
