/* global mixpanel */

export const Events = {
  VIEWED_SNAPSHOT: 'viewed snapshot',
  VIEWED_SNAPSHOTS: 'viewed snapshots',
  VIEWED_TEMPERATURES: 'viewed temperatures',
}

export const track = (event, properties) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  mixpanel.track(
    event,
    properties,
  );
}
