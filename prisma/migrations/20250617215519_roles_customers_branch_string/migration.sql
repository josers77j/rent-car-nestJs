-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_modifiedBy_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_modifiedBy_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_modifiedBy_fkey";

-- AlterTable
ALTER TABLE "Branch" ALTER COLUMN "createdBy" SET DATA TYPE TEXT,
ALTER COLUMN "modifiedBy" SET DATA TYPE TEXT,
ALTER COLUMN "deletedBy" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "createdBy" SET DATA TYPE TEXT,
ALTER COLUMN "deletedBy" SET DATA TYPE TEXT,
ALTER COLUMN "modifiedBy" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "createdBy" SET DATA TYPE TEXT,
ALTER COLUMN "deletedBy" SET DATA TYPE TEXT,
ALTER COLUMN "modifiedBy" SET DATA TYPE TEXT;
