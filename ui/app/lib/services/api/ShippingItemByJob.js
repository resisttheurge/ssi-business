import { ApiService } from 'utils'

export default class ShippingItemByJob extends ApiService {

  /*@ngInject*/
  constructor(
    $q, DrawingByJob, MarkByDrawing, ShippingGroupByJob,
    ShippingGroupItemByShippingGroup, ShippingItem
  ) {
    super()

    this.list = ({ jobId }) =>
      $q.all({
        drawings: DrawingByJob.list(jobId),
        shippingGroups: ShippingGroupByJob.list({ jobId })
      }).then(
        ({ drawings, shippingGroups }) =>
          $q.all({
            drawings: $q.all(
              drawings.map(
                drawing =>
                  MarkByDrawing.list(drawing.id)
                    .then(
                      marks =>
                        $q.all(
                          marks.map(
                            mark =>
                              ShippingItem.get(mark.shippingItem.id)
                                .then(
                                  shippingItem => ({
                                    ...mark,
                                    shippingItem
                                  })
                                )
                          )
                        ).then(
                          marks => ({
                            ...drawing,
                            marks
                          })
                        )
                    )
              )
            ),
            shippingGroups: $q.all(
              shippingGroups.map(
                shippingGroup =>
                  ShippingGroupItemByShippingGroup.list(shippingGroup.id)
                    .then(
                      shippingGroupItems =>
                        $q.all(
                          shippingGroupItems.map(
                            shippingGroupItem =>
                              ShippingItem.get(shippingGroupItem.shippingItem.id)
                                .then(
                                  shippingItem => ({
                                    ...shippingGroupItem,
                                    shippingItem
                                  })
                                )
                          )
                        ).then(
                          shippingGroupItems => ({
                            ...shippingGroup,
                            shippingGroupItems
                          })
                        )
                    )
              )
            )
          })
      )
  }
}
