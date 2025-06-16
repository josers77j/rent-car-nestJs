-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_modifiedBy_fkey";

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "createdBy" SET DATA TYPE TEXT,
ALTER COLUMN "deletedBy" SET DATA TYPE TEXT,
ALTER COLUMN "modifiedBy" SET DATA TYPE TEXT;
