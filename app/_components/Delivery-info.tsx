import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "./_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <>
      <Card className="mt-6 flex justify-around px-5 py-2">
        {/*delivery price*/}
        <div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-sm">Entrega</span>
            <BikeIcon size={14} />
          </div>

          {Number(restaurant.deliveryFee) > 0 ? (
            <p className="text-sm font-semibold">
              {formatCurrency(Number(restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-sm font-semibold">Grátis</p>
          )}
        </div>
        {/*delivery time*/}
        <div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-sm">Entrega</span>
            <TimerIcon size={14} />
          </div>

          {Number(restaurant.deliveryTimeMinutes) > 0 ? (
            <p className="text-sm font-semibold">
              {restaurant.deliveryTimeMinutes} min
            </p>
          ) : (
            <p className="text-sm font-semibold">0 min</p>
          )}
        </div>
      </Card>
    </>
  );
};

export default DeliveryInfo;
