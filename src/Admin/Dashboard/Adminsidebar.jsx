import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Adminsidebar() {
  return (
    <>
      <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 h-fullscreen bg-black top-0 left-0 bottom-0">
        <div>
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
            <p className="text-gray-600 text-3xl">Admin</p>
            </Typography>
          </div>
          <List>
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5 bg-white" />
              </ListItemPrefix>
              <Link to="/admin/dashboard"className=" text-2xl text-white">Dashboard</Link>
            </ListItem>
            <br></br>
            <ListItem>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5  bg-white" />
              </ListItemPrefix>
              <Link to="/admin/Userlist"className=" text-2xl text-white">Userlist</Link>
            </ListItem>
            <br></br>
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5  bg-white" />
              </ListItemPrefix>
              <Link to="/admin/carlist"className=" text-2xl text-white">carlist</Link>
            </ListItem>
            <br></br>
            <ListItem className=" text-2xl text-white">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/admin/booklist"className=" text-2xl text-white"> Booklist</Link>         
            </ListItem>
            <br></br>
          </List>
        </div>
      </Card>
    </>
  );
}

export default Adminsidebar;
