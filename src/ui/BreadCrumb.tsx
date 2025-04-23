import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function BreadCrumb() {
  const navigate = useNavigate();
  return (
    <Breadcrumbs underline="active">
      <BreadcrumbItem onClick={() => navigate("/")} key="home" size="md">
        Home
      </BreadcrumbItem>

      <BreadcrumbItem onClick={() => navigate("/shop")} key="shop" size="md">
        Shop
      </BreadcrumbItem>
      <BreadcrumbItem size="md">Living Room</BreadcrumbItem>
      <BreadcrumbItem size="md">Product</BreadcrumbItem>
    </Breadcrumbs>
  );
}
