// rafce
import React from "react";

const SummaryCard = () => {
  return (
    <div className="mx-auto">
      <div className="flex flex-warp gap-4">
        {/* Left */}
        <div className="w-2/4">
          <div
            className="bg-gray-100 p-4 rounded-md 
          border shadow-md space-y-4"
          >
            <h1 className="font-bold text-lg">ที่อยู่ในการจัดส่ง</h1>
            <textarea className="w-full px-2 rounded-md" />
            <button
              className="bg-blue-500 text-white
            px-4 py-2 rounded-md shadow-md hover:bg-blue-700
            hover:scale-105 hover:translate-y-1 hover:duration-200"
            >
              Save Address
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="w-2/4">
          <div
            className="bg-gray-100 p-4 rounded-md 
          border shadow-md space-y-4"
          >
            <h1 className="text-lg font-bold">คำสั่งซื้อของคุณ</h1>

            {/* Item List */}
            <div>
              <div className="flex justify-between items-end">
                <div>
                  <p>Title: Asus</p>
                  <p>จำนวน : 1 x 2,900</p>
                </div>

                <div>
                  <p className="text-red-500 font-bold">20,000</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <p>ค่าจัดส่ง:</p>
                <p>0.00</p>
              </div>
              <div className="flex justify-between">
                <p>ส่วนลด:</p>
                <p>0.00</p>
              </div>
            </div>

            <hr />
            <div>
              <div className="flex justify-between">
                <p className="font-bold">ยอดรวมสุทธิ:</p>
                <p className="text-red-500 font-bold text-lg">20,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
