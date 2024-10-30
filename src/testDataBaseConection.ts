import prisma from "./infrastructure/repositories/prismaClient";

async function testDatabaseConnection() {
   try {
       const usersData = await prisma.user.findMany();
       console.log('Users retrieved from database:', usersData);
   } catch (error) {
       console.error('Error retrieving users from database:', error);
   }
}

testDatabaseConnection();
