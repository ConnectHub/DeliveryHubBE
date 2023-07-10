import { Spin } from 'antd';

export function LoadingComponent() {
  return (
    <div className="my-20">
      <Spin tip="Carregando..." size="large">
        <div className="content" />
      </Spin>
    </div>
  );
}
