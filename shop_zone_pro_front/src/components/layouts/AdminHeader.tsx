"use client";
import { Breadcrumbs, Stack, Link as LinkMui } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminHeader = (): JSX.Element => {
  const pathname = usePathname();
  return (
    <Breadcrumbs sx={{py: 2}} >
      <LinkMui >
        Admin
      </LinkMui>
      <LinkMui component={Link} href={`/admin/${pathname.split('/admin/')[1]}`}>
        {pathname.split('/admin/')[1]}
      </LinkMui>
    </Breadcrumbs>
  );
};

export default AdminHeader;
