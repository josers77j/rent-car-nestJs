-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_modifiedBy_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdBy" SET DATA TYPE TEXT,
ALTER COLUMN "deletedBy" SET DATA TYPE TEXT,
ALTER COLUMN "modifiedBy" SET DATA TYPE TEXT;
