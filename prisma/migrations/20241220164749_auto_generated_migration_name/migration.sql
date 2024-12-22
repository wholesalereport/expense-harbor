-- AlterTable
ALTER TABLE "PaymentIntent" ADD COLUMN     "status" "PaymentIntentStatus" NOT NULL DEFAULT 'requires_payment_method';
