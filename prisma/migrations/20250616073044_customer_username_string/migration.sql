-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_modifiedBy_fkey";

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "createdBy" SET DATA TYPE TEXT,
ALTER COLUMN "deletedBy" SET DATA TYPE TEXT,
ALTER COLUMN "modifiedBy" SET DATA TYPE TEXT;
