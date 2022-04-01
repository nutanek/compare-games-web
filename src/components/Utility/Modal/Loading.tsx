import { Modal, Spin } from "antd";

const LoadingModal = ({ isOpen }: Props) => (
    <Modal
        centered
        visible={isOpen}
        footer={null}
        closable={false}
        wrapClassName="loading-modal"
    >
        <Spin size="large" />
    </Modal>
);

type Props = {
    isOpen: boolean;
};

export default LoadingModal;
