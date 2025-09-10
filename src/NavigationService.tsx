import { CommonActions, DrawerActions, StackActions } from '@react-navigation/native';
import React from 'react';
import { KEY_APP_NAVIGATOR } from './utility/constants';

let _navigator: any

export const navigationRef: any = React.createRef();

export function navigate(routeName: string, params?: Record<string, any>) {
  navigationRef.current?.navigate(routeName, params);
}

export function replace(routeName: string, params?: Record<string, any>) {
  navigationRef.current?.dispatch(StackActions.replace(routeName, params));
}

export function back() {
  let canGoBack = navigationRef.current?.canGoBack();
  if (canGoBack) {
    navigationRef.current?.goBack();
  } else {
    clearStack(KEY_APP_NAVIGATOR)
  }
}

export function openDrawer() {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
}

export function closeDrawer() {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}

export function clearStack(routeName: string, params?: Record<string, any>) {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: routeName, params: params }],
  });
  navigationRef.current?.dispatch(resetAction);
}

export function push(routeName: string, params: Record<string, any>) {
  navigationRef.current?.dispatch(StackActions.push(routeName, params));
}

export function popToTop() {
  _navigator.dispatch(StackActions.popToTop())
}

export function popToScren(number: number) {
  const popAction = StackActions.pop(number);
  _navigator.dispatch(popAction);
}

export function getCurrentRoute(route: any) {
  if (!route) {
    if (!_navigator || !_navigator.state) return
    route = _navigator.state.nav
  }
  if (route.routes && route.routes.length) {
    return getCurrentRoute(route.routes[route.index])
  } else {
    return route
  }
}

export default {
  back,
  getCurrentRoute,
  navigate,
  popToTop,
  push,
  clearStack,
  popToScren,
  openDrawer,
  closeDrawer,
  replace
}