-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_modifiedBy_fkey";

-- AlterTable
ALTER TABLE "Branch" ALTER COLUMN "createdBy" SET DATA TYPE TEXT,
ALTER COLUMN "modifiedBy" SET DATA TYPE TEXT,
ALTER COLUMN "deletedBy" SET DATA TYPE TEXT;
