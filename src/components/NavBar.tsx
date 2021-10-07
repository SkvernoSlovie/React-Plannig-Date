import React from 'react';
import { useDispatch } from 'react-redux';
import { Layout, Row, Menu } from 'antd';
import { useHistory } from 'react-router';
import { RouteNames } from '../routes';
import { useTypedSelector } from '../hooks/useTypesSelector';
import { AuthActionCreators } from '../store/reducers/auth/actions-creators';

const NavBar = () => {
  const router = useHistory();
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Layout.Header>
      <Row justify="end">
        {isAuth ? (
          <>
            {' '}
            <div style={{ color: '#ffff' }}>{user.username}</div>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item onClick={() => dispatch(AuthActionCreators.logout())} key={1}>
                Выйти
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item onClick={() => router.push(RouteNames.LOGIN)} key={1}>
              Логин
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

export default NavBar;
