package com.cooksys.ssi.api

import akka.actor.{ActorRef, Props}
import com.cooksys.ssi.actor.{DatabaseActor, HttpActor}
import com.cooksys.ssi.route._
import spray.routing.Route

object ApiActor {
  def props: Props = Props(classOf[ApiActor])
}

class ApiActor extends HttpActor with DatabaseActor {

  override def route: Route =
    pathPrefix("api") {
      new AuthRoute ~
        new CarrierRoute ~
        new CustomerRoute ~
        new ManufacturerRoute ~
        new PartRoute ~
        new SalespersonRoute ~
        new ShopRoute ~
        new SpecialtyItemRoute ~
        new SystemTypeRoute ~
        new UserRoute ~
        new VendorRoute
    }

}
